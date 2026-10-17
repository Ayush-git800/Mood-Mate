import { formatGeminiContents, callGeminiApi } from '../server/chatHandler.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-gemini-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { message, history = [], userName = 'Friend', currentMood = 'Thoughtful' } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY || req.headers['x-gemini-key'];
    const contents = formatGeminiContents(history, message);

    const result = await callGeminiApi({
      apiKey,
      contents,
      userName,
      currentMood
    });

    return res.status(200).json({
      success: true,
      ...result
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      error: err.message || 'An error occurred while generating the AI response.',
      message: err.message || 'An error occurred while generating the AI response.',
      code: err.code || 'INTERNAL_ERROR'
    });
  }
}
