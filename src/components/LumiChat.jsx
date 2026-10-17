import React, { useState, useEffect, useRef } from 'react';
import { Send, RefreshCw, Key, AlertCircle, CheckCircle2, ShieldCheck, Sparkles, Terminal, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMood } from '../context/MoodContext';
import { playSingingBowlTone } from '../utils/sound';
import MarkdownRenderer from './MarkdownRenderer';

export default function LumiChat({ currentMood, userName }) {
  const { user } = useAuth();
  const { history } = useMood();

  const effectiveName = userName || (user?.name ? user.name.split(' ')[0] : 'Friend');
  const effectiveMood = currentMood || (history && history.length > 0 ? history[0].mood : 'Thoughtful');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'lumi',
      text: `Hi ${effectiveName}! 🌿 I'm Lumi, your personal emotional reset & intelligence companion powered by Google Gemini AI.

I'm here to support you with everything from **stress de-escalation & grounding** to **coding (C++, JS, Python)**, academic problem solving, and general knowledge.

How can I help you today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customKey, setCustomKey] = useState(() => localStorage.getItem('moodmate_gemini_key') || '');
  const [serverKeyStatus, setServerKeyStatus] = useState(null); // 'configured' | 'missing'
  const [activeModel, setActiveModel] = useState('gemini-3.8-flash');
  const messagesEndRef = useRef(null);

  // Check backend server health and if server-side GEMINI_API_KEY is present
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setServerKeyStatus(data.hasApiKey ? 'configured' : 'missing');
      })
      .catch(() => {
        setServerKeyStatus('missing');
      });
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickChips = [
    { label: "💻 C++ String Reverse", text: "Write a simple C++ program to reverse a string and explain how it works." },
    { label: "🌍 Capital of France", text: "What is the capital of France and what is its current population?" },
    { label: "📚 Exam Stress Support", text: "I'm feeling really overwhelmed with upcoming exams and viva. Can you give me practical advice to cope?" },
    { label: "🧘 5-4-3-2-1 Grounding", text: "Guide me through a 5-4-3-2-1 sensory grounding exercise right now." },
    { label: "💡 Clever Joke", text: "Tell me a genuinely funny, intelligent programming or science joke." }
  ];

  const saveCustomKey = (key) => {
    const trimmed = key.trim();
    setCustomKey(trimmed);
    if (trimmed) {
      localStorage.setItem('moodmate_gemini_key', trimmed);
    } else {
      localStorage.removeItem('moodmate_gemini_key');
    }
    setShowKeyModal(false);
  };

  const sendMessage = async (textToSend) => {
    const userText = textToSend.trim();
    if (!userText || isLoading) return;

    // 1. Append user's message immediately
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      timestamp: Date.now()
    };

    const currentHistory = [...messages];
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history (excluding introductory message and system errors)
      const historyPayload = currentHistory
        .filter((m) => !m.isError && m.id !== 1)
        .map((m) => ({
          sender: m.sender,
          text: m.text
        }));

      const effectiveKey = customKey || localStorage.getItem('moodmate_gemini_key') || (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || '';

      if (!effectiveKey) {
        setShowKeyModal(true);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'lumi',
            text: `🌿 **Welcome!** To chat with Lumi live on this hosted site, please paste your Gemini API key in the popup modal that just opened (or click the 🔑 **Setup API Key** button in the header).\n\n*You can get a free key in seconds at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).*`,
            isError: false,
            timestamp: Date.now()
          }
        ]);
        return;
      }

      // 1. First, attempt direct browser call to Gemini (works 100% on Netlify, Vercel, and GitHub Pages)
      try {
          const contents = [];
          for (const m of historyPayload) {
            if (m.text && m.text.trim()) {
              const role = m.sender === 'user' ? 'user' : 'model';
              if (contents.length === 0 && role !== 'user') continue;
              if (contents.length > 0 && contents[contents.length - 1].role === role) {
                contents[contents.length - 1].parts[0].text += '\n\n' + m.text;
              } else {
                contents.push({ role, parts: [{ text: m.text }] });
              }
            }
          }
          if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
            contents[contents.length - 1].parts[0].text += '\n\n' + userText;
          } else {
            contents.push({ role: 'user', parts: [{ text: userText }] });
          }

          const directRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${effectiveKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents,
                systemInstruction: {
                  parts: [{
                    text: `You are Lumi 🌿, the empathetic, intelligent AI companion inside MoodMate. User: ${effectiveName}, mood: ${effectiveMood}. Support with emotional wellness as well as technical problem-solving (C++, algorithms, science, general knowledge). Always use clean Markdown formatting.`
                  }]
                }
              })
            }
          );

          const directData = await directRes.json();

          if (directData?.candidates?.[0]?.content?.parts?.[0]?.text) {
            const directReply = directData.candidates[0].content.parts[0].text;
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + 1,
                sender: 'lumi',
                text: directReply,
                model: 'gemini-3.8-flash',
                timestamp: Date.now()
              }
            ]);
            playSingingBowlTone();
            return;
          }

          if (directData?.error?.message) {
            throw new Error(directData.error.message);
          }
        } catch (directErr) {
          console.warn('Direct call to Gemini error:', directErr);
          if (directErr.message && !directErr.message.includes('fetch') && !directErr.message.includes('Network')) {
            throw directErr;
          }
        }

      // 2. Fallback to /api/chat if running with backend dev server
      const headers = { 'Content-Type': 'application/json' };
      if (effectiveKey) {
        headers['x-gemini-key'] = effectiveKey;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
          userName: effectiveName,
          currentMood: effectiveMood
        })
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Please enter a valid Gemini API key using the Key 🔑 button in the chat header.');
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || `Server returned status ${response.status}`);
      }

      if (data.model) {
        setActiveModel(data.model);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'lumi',
          text: data.reply,
          model: data.model || 'gemini-3.8-flash',
          timestamp: Date.now()
        }
      ]);
      playSingingBowlTone();
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'lumi',
          text: `⚠️ **AI Service Notice**: ${err.message || 'Unable to connect to Gemini AI'}.\n\n*Tip: Click the Key 🔑 button above to verify or enter your Gemini API key.*`,
          isError: true,
          timestamp: Date.now()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'lumi',
        text: `Fresh slate! 🌿 How can I support you right now, ${effectiveName}? Feel free to ask me anything from stress relief to programming or general questions.`
      }
    ]);
  };

  const isKeyActive = !!(customKey || serverKeyStatus === 'configured');

  return (
    <div className="flex flex-col h-[680px] bg-white dark:bg-darkbg-card rounded-3xl border border-sand-300 dark:border-darkbg-border shadow-soft overflow-hidden">
      {/* Header */}
      <div className="bg-sand-50 dark:bg-darkbg-surface border-b border-sand-300 dark:border-darkbg-border px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sage-100 dark:bg-sage-950 flex items-center justify-center text-xl shadow-inner">
            🌿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-stone-900 dark:text-sand-100 text-sm">
                Lumi 🌿
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Gemini AI ({activeModel.replace('gemini-', '')})
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-sand-400">
              Emotional Reset & Intelligence Companion • Multi-Turn Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* API Key Status / Configuration Button */}
          <button
            onClick={() => setShowKeyModal(true)}
            className={`text-xs flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-colors ${
              isKeyActive
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 animate-pulse'
            }`}
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">
              {isKeyActive ? 'API Key Configured' : 'Setup API Key'}
            </span>
          </button>

          {/* Reset Conversation */}
          <button
            onClick={handleResetChat}
            className="text-xs text-stone-500 hover:text-stone-800 dark:text-sand-400 dark:hover:text-white flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-sand-200 dark:hover:bg-darkbg-card transition-colors"
            title="Reset conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Quick Prompts Strip */}
      <div className="px-4 py-2 bg-sand-100/60 dark:bg-darkbg-surface/50 border-b border-sand-200 dark:border-darkbg-border flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-semibold text-stone-400 dark:text-sand-400 flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 text-amber-500" /> Prompts:
        </span>
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => sendMessage(chip.text)}
            disabled={isLoading}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-darkbg-card hover:bg-sand-200 dark:hover:bg-darkbg-border border border-sand-300 dark:border-darkbg-border text-stone-700 dark:text-sand-300 transition-colors shrink-0 disabled:opacity-50"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-sand-50/50 dark:bg-darkbg-surface/40">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[88%] sm:max-w-[80%] px-4 py-3 rounded-2xl shadow-xs ${
                m.sender === 'user'
                  ? 'bg-sage-600 text-white rounded-br-none'
                  : m.isError
                  ? 'bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 border border-red-200 dark:border-red-800 rounded-bl-none'
                  : 'bg-white dark:bg-darkbg-card text-stone-800 dark:text-sand-100 border border-sand-300 dark:border-darkbg-border rounded-bl-none'
              }`}
            >
              {m.sender === 'user' ? (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
              ) : (
                <MarkdownRenderer content={m.text} />
              )}
            </div>
          </div>
        ))}

        {/* Loading Spinner / Typing indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border px-4 py-2.5 rounded-2xl rounded-bl-none flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 bg-sage-500 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-sage-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-sage-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-xs text-stone-500 dark:text-sand-400 font-medium ml-1">
                Lumi is thinking via Gemini AI...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-white dark:bg-darkbg-card border-t border-sand-300 dark:border-darkbg-border flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask Lumi anything (coding in C++, stress reset, general knowledge)...`}
          disabled={isLoading}
          className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-sand-300 dark:border-darkbg-border focus:outline-hidden focus:ring-2 focus:ring-sage-500/40 bg-sand-50 dark:bg-darkbg-surface text-stone-900 dark:text-sand-100 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-4 py-2.5 bg-sage-600 hover:bg-sage-700 disabled:opacity-40 text-white rounded-xl transition-all flex items-center justify-center shadow-xs cursor-pointer disabled:cursor-not-allowed"
          title="Send Message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* API Key Settings Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border rounded-3xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sand-200 dark:border-darkbg-border">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sage-100 dark:bg-sage-950 text-sage-700 dark:text-sage-300">
                  <Key className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 dark:text-sand-100 text-base">
                  Gemini API Configuration
                </h3>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-stone-400 hover:text-stone-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 dark:text-sand-300 leading-relaxed">
              Lumi uses Google's official Gemini API (<code className="text-sage-700 dark:text-sage-400 font-mono">gemini-1.5-flash</code>) for real multi-turn intelligent reasoning.
            </p>

            {/* Server-side status */}
            <div className="p-3 rounded-xl bg-sand-100 dark:bg-darkbg-surface border border-sand-200 dark:border-darkbg-border text-xs space-y-1">
              <div className="flex items-center gap-2 font-semibold">
                {serverKeyStatus === 'configured' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-700 dark:text-emerald-400">Server Key Active in .env</span>
                  </>
                ) : (
                  <>
                    <Info className="w-4 h-4 text-amber-500" />
                    <span className="text-amber-700 dark:text-amber-400">No Key in server .env</span>
                  </>
                )}
              </div>
              <p className="text-stone-500 dark:text-sand-400 text-[11px]">
                You can add <code className="bg-sand-200 dark:bg-stone-800 px-1 py-0.5 rounded">GEMINI_API_KEY=your_key</code> in your project’s <code className="bg-sand-200 dark:bg-stone-800 px-1 py-0.5 rounded">.env</code> file, OR paste it below for instant use.
              </p>
            </div>

            {/* Client Key Override Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 dark:text-sand-300 block">
                Direct Gemini API Key (Stored safely in local session):
              </label>
              <input
                type="password"
                defaultValue={customKey}
                id="geminiKeyInput"
                placeholder="AIzaSy..."
                className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-sand-300 dark:border-darkbg-border bg-sand-50 dark:bg-darkbg-surface text-stone-900 dark:text-sand-100 focus:outline-hidden focus:ring-2 focus:ring-sage-500"
              />
              <p className="text-[11px] text-stone-400">
                Get a free API key at{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sage-600 dark:text-sage-400 underline font-semibold"
                >
                  aistudio.google.com/app/apikey
                </a>
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              {customKey && (
                <button
                  type="button"
                  onClick={() => saveCustomKey('')}
                  className="text-xs text-red-600 hover:text-red-700 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40"
                >
                  Clear Key
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  const val = document.getElementById('geminiKeyInput')?.value || '';
                  saveCustomKey(val);
                }}
                className="text-xs font-semibold bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-xl transition-colors"
              >
                Save & Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}