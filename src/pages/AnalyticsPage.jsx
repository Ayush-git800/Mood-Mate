import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Calendar as CalendarIcon,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  Smile,
  ArrowRight,
  Info,
  Clock,
  RotateCcw
} from 'lucide-react';
import { useMood } from '../context/MoodContext';
import { useAuth } from '../context/AuthContext';
import { MOODS } from '../data/seedData';

export default function AnalyticsPage() {
  const { history, clearCurrentHistory } = useMood();
  const { user, loadDemo } = useAuth();
  const [selectedBar, setSelectedBar] = useState(null);

  // Sort chronologically ascending
  const sorted = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Determine current 7-day window
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Map to 7 bars (take last 7 logs if available, or populate based on day names)
  const currentWeekLogs = sorted.slice(-7);

  // If we have logs, calculate Weekly Joy Index (% with valence >= 5)
  const totalValence = currentWeekLogs.reduce((acc, curr) => acc + curr.valence, 0);
  const avgValence = currentWeekLogs.length > 0 ? (totalValence / currentWeekLogs.length).toFixed(1) : 0;
  const positiveCount = currentWeekLogs.filter(l => l.valence >= 5).length;
  const joyIndex = currentWeekLogs.length > 0 ? Math.round((positiveCount / currentWeekLogs.length) * 100) : 0;

  // Mood color palette for bars
  const moodColorPalette = {
    happy: { bg: 'bg-amber-400 dark:bg-amber-500', glow: 'shadow-amber-400/40', text: 'text-amber-600 dark:text-amber-400', hex: '#E9B949' },
    excited: { bg: 'bg-orange-500 dark:bg-orange-600', glow: 'shadow-orange-500/40', text: 'text-orange-600 dark:text-orange-400', hex: '#F59E0B' },
    bored: { bg: 'bg-slate-400 dark:bg-slate-500', glow: 'shadow-slate-400/30', text: 'text-slate-600 dark:text-slate-400', hex: '#94A3B8' },
    tired: { bg: 'bg-indigo-400 dark:bg-indigo-500', glow: 'shadow-indigo-400/40', text: 'text-indigo-600 dark:text-indigo-400', hex: '#818CF8' },
    anxious: { bg: 'bg-sky-400 dark:bg-sky-500', glow: 'shadow-sky-400/40', text: 'text-sky-600 dark:text-sky-400', hex: '#38BDF8' },
    stressed: { bg: 'bg-rose-400 dark:bg-rose-500', glow: 'shadow-rose-400/40', text: 'text-rose-600 dark:text-rose-400', hex: '#D97757' },
    sad: { bg: 'bg-cyan-500 dark:bg-cyan-600', glow: 'shadow-cyan-500/40', text: 'text-cyan-600 dark:text-cyan-400', hex: '#6BA4B8' },
    angry: { bg: 'bg-red-500 dark:bg-red-600', glow: 'shadow-red-500/40', text: 'text-red-600 dark:text-red-400', hex: '#F43F5E' },
    calm: { bg: 'bg-emerald-500 dark:bg-emerald-600', glow: 'shadow-emerald-500/40', text: 'text-emerald-600 dark:text-emerald-400', hex: '#4B7C59' }
  };

  // Calendar mock grid
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-10-${dayNum < 10 ? `0${dayNum}` : dayNum}`;
    const matchedLog = sorted.find(l => l.date === dateStr);
    return {
      day: dayNum,
      date: dateStr,
      entry: matchedLog
    };
  });

  const isEmpty = sorted.length === 0;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-200 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border text-xs font-semibold text-stone-700 dark:text-sand-300">
          <BarChart3 className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
          <span>Biometric & Emotional Rhythm</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-sand-50 tracking-tight">
          The Joyful Mood Graph
        </h1>
        <p className="text-sm text-stone-600 dark:text-sand-300 max-w-lg mx-auto">
          Expressive 7-day emotional energy pillars with valence scores, mood stamps, and journal memory.
        </p>

        {/* Demo Switch for Judges */}
        <div className="pt-2 flex items-center justify-center gap-3">
          {isEmpty ? (
            <button
              onClick={() => loadDemo()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-bold transition-all shadow-xs hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Load 14-Day Sample History (Demo & Judging Mode)</span>
            </button>
          ) : (
            <button
              onClick={() => clearCurrentHistory()}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-sand-200/80 hover:bg-sand-300/80 dark:bg-darkbg-card text-stone-600 dark:text-sand-300 text-xs font-medium border border-sand-300 dark:border-darkbg-border transition-colors"
              title="Reset history back to blank canvas"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Switch Back to Blank Canvas</span>
            </button>
          )}
        </div>
      </div>

      {/* Metric Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Weekly Joy Index */}
        <div className="p-5 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center text-2xl font-bold">
            ⚡
          </div>
          <div>
            <div className="text-2xl font-extrabold text-stone-900 dark:text-sand-50">
              {isEmpty ? '0%' : `${joyIndex}%`}
            </div>
            <div className="text-xs font-bold text-stone-700 dark:text-sand-300">
              Weekly Joy Index
            </div>
            <div className="text-[11px] text-stone-500 dark:text-sand-400">
              {isEmpty ? 'Log check-ins to calculate' : `${positiveCount} of ${currentWeekLogs.length} days steady or joyful`}
            </div>
          </div>
        </div>

        {/* Average Energy Valence */}
        <div className="p-5 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sage-100 dark:bg-sage-950/60 text-sage-700 dark:text-sage-300 flex items-center justify-center text-2xl font-bold">
            🌿
          </div>
          <div>
            <div className="text-2xl font-extrabold text-stone-900 dark:text-sand-50">
              {isEmpty ? '—' : `${avgValence} / 8`}
            </div>
            <div className="text-xs font-bold text-stone-700 dark:text-sand-300">
              Emotional Valence
            </div>
            <div className="text-[11px] text-stone-500 dark:text-sand-400">
              {isEmpty ? '1 (Heavy) to 8 (Peak Joy)' : 'Balanced emotional weather'}
            </div>
          </div>
        </div>

        {/* Days Tracked */}
        <div className="p-5 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-2xl font-bold">
            📅
          </div>
          <div>
            <div className="text-2xl font-extrabold text-stone-900 dark:text-sand-50">
              {sorted.length} Days
            </div>
            <div className="text-xs font-bold text-stone-700 dark:text-sand-300">
              Total Recorded Logs
            </div>
            <div className="text-[11px] text-stone-500 dark:text-sand-400">
              {user?.streak ? `${user.streak}-day active streak 🔥` : 'Start your streak today'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Joyful Bar Chart Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-sand-100">
              7-Day Vertical Emotional Energy Pillars
            </h2>
            <p className="text-xs text-stone-500 dark:text-sand-400">
              Tap or hover over any pillar to read your micro-journal notes and details.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-stone-600 dark:text-sand-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Joyful (7-8)
            </span>
            <span className="flex items-center gap-1.5 text-stone-600 dark:text-sand-300 ml-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Calm (5-6)
            </span>
            <span className="flex items-center gap-1.5 text-stone-600 dark:text-sand-300 ml-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Heavy (1-4)
            </span>
          </div>
        </div>

        {/* Empty State Banner if 0 logs */}
        {isEmpty ? (
          <div className="py-14 px-4 text-center rounded-3xl bg-sand-100/70 dark:bg-darkbg-surface/50 border-2 border-dashed border-sand-300 dark:border-darkbg-border space-y-4">
            <div className="text-5xl">🎨</div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900 dark:text-sand-100">
                Your emotional canvas is waiting for its first check-in!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-sand-400 max-w-md mx-auto">
                No history recorded yet. Take 30 seconds to log how you're feeling right now and start your joyful trend graph.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/checkin"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-bold text-xs shadow-soft transition-all hover:scale-105"
              >
                <Smile className="w-4 h-4" />
                <span>Log First Mood</span>
              </Link>
              <button
                onClick={() => loadDemo()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-bold text-xs transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Preview With Demo Data</span>
              </button>
            </div>
          </div>
        ) : (
          /* Populated 7-Day Animated Vertical Bar Columns */
          <div className="space-y-6">
            <div className="h-64 sm:h-72 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2 sm:px-6 border-b border-sand-300 dark:border-darkbg-border relative">
              {/* Y-axis indicator lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-stone-500 w-full" />
                <div className="border-b border-stone-500 w-full" />
                <div className="border-b border-stone-500 w-full" />
                <div className="border-b border-stone-500 w-full" />
              </div>

              {currentWeekLogs.map((entry, idx) => {
                const heightPercent = Math.max(15, (entry.valence / 8) * 100);
                const colorConfig = moodColorPalette[entry.mood] || moodColorPalette.calm;
                const isSelected = selectedBar?.id === entry.id;

                return (
                  <div
                    key={entry.id}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    onClick={() => setSelectedBar(entry)}
                  >
                    {/* Emoji badge hovering above bar */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.08, type: 'spring', stiffness: 300 }}
                      className={`text-xl sm:text-2xl mb-2 transition-transform duration-200 ${isSelected ? 'scale-135' : 'group-hover:scale-120'}`}
                    >
                      {entry.emoji}
                    </motion.div>

                    {/* The Rounded Pill Bar */}
                    <div className="w-full max-w-[42px] bg-sand-200/50 dark:bg-darkbg-surface/60 rounded-full h-full flex items-end p-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.08, ease: 'easeOut' }}
                        className={`w-full rounded-full transition-all ${colorConfig.bg} shadow-md ${colorConfig.glow} ${
                          isSelected ? 'ring-4 ring-sage-400 dark:ring-sage-500 scale-105' : 'group-hover:opacity-90'
                        }`}
                      />
                    </div>

                    {/* Day Label */}
                    <div className="mt-3 text-center">
                      <div className="text-xs font-bold text-stone-800 dark:text-sand-100">
                        {entry.dayName}
                      </div>
                      <div className="text-[10px] text-stone-400 dark:text-sand-400">
                        {entry.valence}/8
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Tooltip Card on Bar Selection */}
            {selectedBar && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border shadow-md flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{selectedBar.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900 dark:text-sand-50 capitalize">
                        {selectedBar.mood} Day ({selectedBar.dayName}, {selectedBar.date})
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sand-200 dark:bg-darkbg-card text-stone-700 dark:text-sand-300">
                        Valence {selectedBar.valence}/8
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 dark:text-sand-300 mt-1 italic">
                      "{selectedBar.note || 'Mindful daily pause'}"
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedBar(null)}
                  className="text-xs font-semibold text-stone-400 hover:text-stone-700 dark:hover:text-white"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* 30-Day Calendar View */}
      <div className="p-6 sm:p-8 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-sage-600" />
            <h3 className="font-bold text-stone-900 dark:text-sand-100 text-base sm:text-lg">
              October 2026 Monthly Mood Stamping
            </h3>
          </div>
          <span className="text-xs text-stone-500 dark:text-sand-400 font-medium">
            Calendar Overview
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-xs font-bold text-stone-500 dark:text-sand-400 py-1 uppercase">
              {d}
            </div>
          ))}

          {/* Blank offset for Oct 1, 2026 (Thursday) */}
          <div className="h-12 sm:h-14 rounded-2xl bg-sand-200/20 dark:bg-darkbg-surface/30 opacity-40" />
          <div className="h-12 sm:h-14 rounded-2xl bg-sand-200/20 dark:bg-darkbg-surface/30 opacity-40" />
          <div className="h-12 sm:h-14 rounded-2xl bg-sand-200/20 dark:bg-darkbg-surface/30 opacity-40" />
          <div className="h-12 sm:h-14 rounded-2xl bg-sand-200/20 dark:bg-darkbg-surface/30 opacity-40" />

          {calendarDays.map((item) => {
            const hasEntry = !!item.entry;
            return (
              <div
                key={item.day}
                className={`h-12 sm:h-14 rounded-2xl border p-1 flex flex-col justify-between transition-all ${
                  hasEntry
                    ? 'bg-white dark:bg-darkbg-surface border-sage-300 dark:border-sage-800 shadow-xs hover:scale-105'
                    : 'bg-sand-200/30 dark:bg-darkbg-surface/30 border-sand-300/40 dark:border-darkbg-border/40 opacity-70'
                }`}
                title={hasEntry ? `${item.date}: ${item.entry.mood} - "${item.entry.note}"` : `No log for ${item.date}`}
              >
                <span className="text-[10px] font-bold text-stone-400 dark:text-sand-400 text-left">
                  {item.day}
                </span>
                <span className="text-base sm:text-lg self-center">
                  {hasEntry ? item.entry.emoji : '·'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
