import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  Bot,
  User,
  HeartHandshake,
  Key,
  ShieldCheck,
  RefreshCw,
  Lightbulb,
  Settings,
  CheckCircle2,
  Wind,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMood } from '../context/MoodContext';
import { MIA_SCENARIOS } from '../data/seedData';
import { storageService } from '../utils/storage';
import { playSingingBowlTone } from '../utils/sound';

export default function MiaChatPage() {
  const { user } = useAuth();
  const { history } = useMood();

  // Find user's latest mood if any
  const latestLog = history.length > 0 ? history[0] : null;
  const userName = user?.name ? user.name.split(' ')[0] : 'friend';

  // API Config State
  const [apiConfig, setApiConfig] = useState(() => storageService.getApiConfig());
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(apiConfig.apiKey || '');
  const [useLiveApi, setUseLiveApi] = useState(apiConfig.useLiveApi || false);
  const [provider, setProvider] = useState(apiConfig.provider || 'gemini');

  // Interactive In-Chat Grounding Exercise State
  const [activeGroundingStep, setActiveGroundingStep] = useState(null); // null | 0..4

  const groundingSteps = [
    { num: 5, sense: 'Sight', instruction: 'Look around and name 5 things you can see right now.', emoji: '👁️' },
    { num: 4, sense: 'Touch', instruction: 'Physically touch 4 textures near you (wood, clothing, cold glass, paper).', emoji: '✋' },
    { num: 3, sense: 'Hearing', instruction: 'Listen closely for 3 distinct sounds in your environment.', emoji: '👂' },
    { num: 2, sense: 'Smell', instruction: 'Notice 2 scents in the room (fresh air, coffee, skin, sweater).', emoji: '👃' },
    { num: 1, sense: 'Taste', instruction: 'Take 1 mindful sip of water or notice the clean taste in your mouth.', emoji: '👅' }
  ];

  // Conversation history
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'mia',
      text: `Hello ${userName} 🌿 I'm Mia, your empathetic mental reset companion.${
        latestLog
          ? ` I see you felt ${latestLog.mood} earlier today (${latestLog.emoji}). How is your energy unfolding right now?`
          : " I'm here without judgment whenever you need to decompress or ground your nervous system."
      }`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "I'm feeling overwhelmed with exam deadlines",
    "Help me ground myself right now",
    "I flunked my quiz and feel like a failure",
    "I can't sleep and my brain is spinning",
    "Celebrating a small win today!"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, activeGroundingStep]);

  // Save API config changes
  const handleSaveConfig = (e) => {
    e.preventDefault();
    const updated = {
      useLiveApi,
      apiKey: apiKeyInput.trim(),
      provider
    };
    setApiConfig(updated);
    storageService.saveApiConfig(updated);
    setIsConfigOpen(false);
  };

  /**
   * Multi-Branch Conversational Response Engine
   */
  const generateResponse = async (userPrompt) => {
    // 1. If Live API Key configured and enabled:
    if (apiConfig.useLiveApi && apiConfig.apiKey) {
      try {
        if (apiConfig.provider === 'gemini') {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiConfig.apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: `You are Mia, an extraordinarily empathetic, grounded, non-clinical emotional reset companion for students. Keep answers under 3 paragraphs. Validate warmly, avoid clichés, and encourage somatic grounding. User's name is ${userName}. User says: "${userPrompt}"`
                      }
                    ]
                  }
                ]
              })
            }
          );
          const data = await res.json();
          if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
          }
        }
      } catch (err) {
        console.warn('Live API request fell back to client NLP:', err);
      }
    }

    // 2. High-Craft Client-Side Multi-Branch NLP (Offline & Zero-Leak)
    const lower = userPrompt.toLowerCase();

    // Check if user specifically asks for grounding / breathing
    if (lower.includes('ground') || lower.includes('panic') || lower.includes('anxiety attack') || lower.includes('calm me down')) {
      setActiveGroundingStep(0);
      return `I am right here with you, ${userName}. Put both feet flat on the floor and take a slow inhale. Let's do the 5-4-3-2-1 somatic grounding exercise together right here in our chat. Look below to begin step 1:`;
    }

    // Match across 20+ specialized student scenarios
    for (const scenario of MIA_SCENARIOS) {
      for (const kw of scenario.keywords) {
        if (lower.includes(kw)) {
          return scenario.response(userName);
        }
      }
    }

    // General emotional sentiments fallback
    if (lower.includes('sad') || lower.includes('cry') || lower.includes('hurt') || lower.includes('unhappy')) {
      return `I hear the quiet weight in your words, ${userName}. It takes vulnerability to admit when things hurt. You don't have to put on a brave face right here. Wrap yourself in warmth, sip some water, and remember that healing doesn't have a deadline. What is one gentle thing you can do for yourself this evening?`;
    }

    if (lower.includes('stress') || lower.includes('busy') || lower.includes('rush') || lower.includes('pressure')) {
      return `When stress reaches high volume, ${userName}, your mind tries to solve the next three weeks all at once. Let's put down the mental luggage for just five minutes. Can you drop your shoulders down away from your ears, unclench your jaw, and focus solely on your next single breath?`;
    }

    if (lower.includes('happy') || lower.includes('good') || lower.includes('excited') || lower.includes('great')) {
      return `That bright spark in your voice brings so much warmth, ${userName}! Soak in this feeling—bookmark it mentally so your body remembers what peace and joy feel like. Thank you for sharing your light with me today!`;
    }

    // Default warm empathetic active listening
    return `Thank you for sharing that with me, ${userName}. It takes genuine courage to put honest feelings into words instead of bottling them up. If you could give yourself just 5% more grace and kindness right now, what would that look like in this exact hour?`;
  };

  const handleSend = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isTyping) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Natural empathetic typing delay
      await new Promise(r => setTimeout(r, 650));
      const response = await generateResponse(messageText);
      setIsTyping(false);

      setMessages(prev => [
        ...prev,
        {
          id: 'mia-' + Date.now(),
          sender: 'mia',
          text: response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      playSingingBowlTone();
    } catch (e) {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: 'mia-fallback-' + Date.now(),
          sender: 'mia',
          text: "I am taking a slow breath. I am right here with you—tell me more about what is on your mind.",
          timestamp: 'Just now'
        }
      ]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-sand-200/70 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-sage-100 dark:bg-sage-950 border border-sage-300 dark:border-sage-800 flex items-center justify-center text-2xl shadow-xs">
            🌿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-stone-900 dark:text-sand-50">
                Mia — Empathetic AI Companion
              </h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                {apiConfig.useLiveApi ? 'Live LLM Connected' : 'Smart Client NLP'}
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-sand-400">
              Active listening, 20+ student scenarios, and interactive grounding.
            </p>
          </div>
        </div>

        {/* API Bridge / Settings Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsConfigOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-xs font-semibold text-stone-700 dark:text-sand-300 hover:border-sage-500 transition-colors shadow-xs"
            title="Configure Live Gemini / OpenRouter API Key"
          >
            <Settings className="w-3.5 h-3.5 text-stone-500" />
            <span>API Bridge</span>
          </button>
        </div>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-stone-500 dark:text-sand-400 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Starters:
        </span>
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="px-3 py-1.5 rounded-xl bg-sand-100 hover:bg-sand-200 dark:bg-darkbg-card dark:hover:bg-darkbg-border border border-sand-300 dark:border-darkbg-border text-xs text-stone-700 dark:text-sand-300 font-medium transition-all hover:scale-102"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Stream */}
      <div className="h-[460px] overflow-y-auto p-4 sm:p-6 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border space-y-4 shadow-inner">
        {messages.map((m) => {
          const isMia = m.sender === 'mia';
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${isMia ? 'justify-start' : 'justify-end'}`}
            >
              {isMia && (
                <div className="w-9 h-9 rounded-2xl bg-sage-100 dark:bg-sage-950 border border-sage-300 dark:border-sage-800 flex items-center justify-center text-lg shrink-0 shadow-xs">
                  🌿
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 shadow-xs text-sm leading-relaxed whitespace-pre-line ${
                  isMia
                    ? 'bg-white dark:bg-darkbg-surface text-stone-800 dark:text-sand-100 border border-sand-300 dark:border-darkbg-border'
                    : 'bg-sage-600 text-white rounded-tr-xs'
                }`}
              >
                <div className="font-medium">{m.text}</div>
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    isMia ? 'text-stone-400 dark:text-sand-400' : 'text-sage-200'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
              {!isMia && (
                <div className="w-9 h-9 rounded-2xl bg-sand-200 dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border flex items-center justify-center text-lg shrink-0 shadow-xs">
                  {user?.avatar || '🌱'}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Interactive In-Chat 5-4-3-2-1 Sensory Grounding Card */}
        {activeGroundingStep !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{groundingSteps[activeGroundingStep].emoji}</span>
                <div>
                  <h4 className="font-bold text-sm text-emerald-950 dark:text-emerald-100">
                    Step {activeGroundingStep + 1} of 5: {groundingSteps[activeGroundingStep].num} Sensory Things ({groundingSteps[activeGroundingStep].sense})
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300">
                    {groundingSteps[activeGroundingStep].instruction}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Notice it in your room...
              </span>
              <button
                type="button"
                onClick={() => {
                  if (activeGroundingStep < 4) {
                    setActiveGroundingStep(prev => prev + 1);
                  } else {
                    setActiveGroundingStep(null);
                    setMessages(prev => [
                      ...prev,
                      {
                        id: 'grounding-done-' + Date.now(),
                        sender: 'mia',
                        text: `Wonderful work, ${userName}. Notice how your shoulders feel right now compared to 2 minutes ago. Your nervous system is anchored back to the present. You are safe.`,
                        timestamp: 'Just now'
                      }
                    ]);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all hover:scale-105"
              >
                <span>{activeGroundingStep < 4 ? 'I Found It → Next Step' : 'Complete Grounding ✨'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {isTyping && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-9 h-9 rounded-2xl bg-sage-100 dark:bg-sage-950 border border-sage-300 dark:border-sage-800 flex items-center justify-center text-lg shrink-0">
              🌿
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border flex items-center gap-1.5 text-stone-500 text-xs">
              <span className="w-2 h-2 rounded-full bg-sage-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-sage-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-sage-500 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-2 font-medium">Mia is reflecting warmly...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 p-2 rounded-2xl bg-white dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border shadow-xs focus-within:ring-2 focus-within:ring-sage-500"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Speak with Mia freely, ${userName}...`}
          className="flex-1 px-4 py-2.5 bg-transparent text-sm text-stone-900 dark:text-sand-100 placeholder-stone-400 focus:outline-hidden"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="px-4 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* API Bridge Configuration Modal */}
      <AnimatePresence>
        {isConfigOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfigOpen(false)}
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-sand-100 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border rounded-3xl p-6 shadow-2xl z-10 space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-sage-600" />
                  <h3 className="font-bold text-base text-stone-900 dark:text-sand-100">
                    Live LLM API Bridge
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsConfigOpen(false)}
                  className="p-1 rounded-xl text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-stone-600 dark:text-sand-400 leading-relaxed">
                By default, Mia uses our smart offline client NLP engine. Judges or developers can optionally plug in a free Google Gemini API key to enable live streaming model responses.
              </p>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border">
                  <span className="text-xs font-bold text-stone-800 dark:text-sand-200">
                    Enable Live LLM Generation
                  </span>
                  <input
                    type="checkbox"
                    checked={useLiveApi}
                    onChange={(e) => setUseLiveApi(e.target.checked)}
                    className="w-4 h-4 accent-sage-600 rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-sand-300 mb-1">
                    Google Gemini API Key
                  </label>
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-xs text-stone-900 dark:text-sand-100 font-mono"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    Keys are stored securely in local browser storage only.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsConfigOpen(false)}
                    className="px-3 py-2 text-xs font-semibold text-stone-600 dark:text-sand-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    Save Configuration
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
