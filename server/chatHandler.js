/**
 * Backend AI Chat Handler for MoodMate — Powered by Google Gemini API
 * Handles multi-turn conversation context, error handling, and system instructions.
 */

const GEMINI_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-flash-latest',
  'gemini-2.5-flash-lite',
  'gemini-1.5-flash'
];

/**
 * Format conversation history into valid Gemini multi-turn format
 */
export function formatGeminiContents(history, currentMessage) {
  const contents = [];

  if (Array.isArray(history)) {
    for (const msg of history) {
      if (!msg || typeof msg.text !== 'string' || !msg.text.trim()) continue;

      const role = (msg.sender === 'user') ? 'user' : 'model';

      // Gemini requires the first turn to be 'user'
      if (contents.length === 0 && role !== 'user') continue;

      // Gemini requires alternating roles (user -> model -> user -> model)
      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += '\n\n' + msg.text.trim();
      } else {
        contents.push({
          role,
          parts: [{ text: msg.text.trim() }]
        });
      }
    }
  }

  // Ensure currentMessage is appended as the latest 'user' turn
  const cleanMsg = (currentMessage || '').trim();
  if (cleanMsg) {
    if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
      // If last message was already user with identical text, avoid duplicating
      if (contents[contents.length - 1].parts[0].text !== cleanMsg) {
        contents[contents.length - 1].parts[0].text += '\n\n' + cleanMsg;
      }
    } else {
      contents.push({
        role: 'user',
        parts: [{ text: cleanMsg }]
      });
    }
  }

  // Limit conversation to last 20 turns to prevent token overflow
  if (contents.length > 20) {
    const trimmed = contents.slice(-20);
    // Ensure trimmed starts with 'user'
    while (trimmed.length > 0 && trimmed[0].role !== 'user') {
      trimmed.shift();
    }
    return trimmed;
  }

  return contents;
}

/**
 * Call Google Gemini API with fallback across model versions
 */
export async function callGeminiApi({ apiKey, contents, userName = 'Friend', currentMood = 'Thoughtful' }) {
  if (!apiKey || !apiKey.trim()) {
    throw {
      status: 401,
      code: 'MISSING_API_KEY',
      message: 'GEMINI_API_KEY is not configured. Please add GEMINI_API_KEY=your_key to your .env file or enter it in the AI Settings in the chat.'
    };
  }

  const cleanKey = apiKey.trim();

  const systemInstruction = {
    parts: [
      {
        text: `You are Lumi 🌿, the empathetic, intelligent, and highly capable AI companion inside MoodMate (Your Everyday Happiness & Mental Reset Hub).
You have two core strengths:
1. Emotional Wellness & Active Listening: Warm, non-clinical validation, stress de-escalation, and somatic grounding when users share feelings or need mental peace. The user's name is ${userName} and their current mood is ${currentMood}.
2. Comprehensive Technical & General Knowledge: You can answer ANY question accurately, clearly, and thoroughly:
   - Programming, C++, Python, algorithms, architecture, and debugging.
   - Science, artificial intelligence, mathematics, and academic questions.
   - General knowledge, brainstorming, creative writing, and jokes.
Formatting rules:
- When providing code (e.g. C++), use Markdown fenced code blocks with language identifiers (\`\`\`cpp ... \`\`\`).
- Maintain full conversation context across follow-up questions.
- Be thoughtful, concise, and helpful. Avoid clinical medical jargon.`
      }
    ]
  };

  let lastError = null;

  for (const model of GEMINI_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${cleanKey}`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents,
          systemInstruction,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048
          }
        })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        const errObj = data.error || {};
        const errMsg = errObj.message || `Gemini API returned status ${res.status}`;

        // Check if API key is invalid
        if (res.status === 400 && (errMsg.includes('API key') || errObj.status === 'INVALID_ARGUMENT')) {
          throw {
            status: 401,
            code: 'INVALID_API_KEY',
            message: `Invalid Gemini API Key: ${errMsg}. Please check your key at https://aistudio.google.com/app/apikey`
          };
        }

        // Check for rate limit or quota
        if (res.status === 429 || errObj.status === 'RESOURCE_EXHAUSTED') {
          throw {
            status: 429,
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Gemini API rate limit or quota reached. Please wait a moment and try again.'
          };
        }

        // If model not found (404), try next model in fallback list
        if (res.status === 404 || errMsg.includes('not found')) {
          lastError = { status: 404, message: errMsg };
          continue;
        }

        throw {
          status: res.status || 500,
          code: errObj.status || 'API_ERROR',
          message: errMsg
        };
      }

      // Check if response contains candidates
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!reply) {
        // Check if blocked by safety settings
        const finishReason = data.candidates?.[0]?.finishReason;
        if (finishReason === 'SAFETY') {
          return {
            reply: "I couldn't generate a response because of safety filter guidelines. Could you rephrase your question?",
            model
          };
        }
        throw {
          status: 500,
          code: 'EMPTY_RESPONSE',
          message: 'The AI model returned an empty response.'
        };
      }

      return {
        success: true,
        reply,
        model,
        usage: data.usageMetadata
      };
    } catch (err) {
      if (err.code === 'INVALID_API_KEY' || err.code === 'RATE_LIMIT_EXCEEDED') {
        throw err;
      }
      lastError = err;
    }
  }

  throw lastError || {
    status: 500,
    code: 'ALL_MODELS_FAILED',
    message: 'Could not connect to Google Gemini API models.'
  };
}
