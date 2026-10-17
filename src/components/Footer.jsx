import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RotateCcw, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMood } from '../context/MoodContext';

export default function Footer() {
  const { loadDemo, user } = useAuth();
  const { clearCurrentHistory } = useMood();
  const [toastMsg, setToastMsg] = useState(null);
  const navigate = useNavigate();

  const handleLoadDemo = () => {
    loadDemo();
    setToastMsg('Demo Profile Loaded (14 Days, 160 Coins, 5-Day Streak)!');
    setTimeout(() => setToastMsg(null), 3000);
    navigate('/analytics');
  };

  const handleResetBlank = () => {
    if (window.confirm('Reset this profile back to a completely clean, fresh blank canvas (0 days logged)?')) {
      clearCurrentHistory();
      setToastMsg('Canvas reset to 0 logs!');
      setTimeout(() => setToastMsg(null), 3000);
    }
  };

  return (
    <footer className="mt-auto border-t border-sand-300/70 dark:border-darkbg-border bg-sand-200/50 dark:bg-darkbg-surface/50 text-stone-600 dark:text-sand-400 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="font-bold text-stone-900 dark:text-sand-100">MoodMate</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-sand-300/60 dark:bg-darkbg-card text-stone-600 dark:text-sand-300">
              v2.0 Production Edition
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <Link to="/checkin" className="hover:text-sage-700 dark:hover:text-sage-400 transition-colors">Daily Sanctuary</Link>
            <Link to="/analytics" className="hover:text-sage-700 dark:hover:text-sage-400 transition-colors">Joyful Graph</Link>
            <Link to="/wallet" className="hover:text-sage-700 dark:hover:text-sage-400 transition-colors">Rewards Hub</Link>
            <Link to="/lumi" className="hover:text-sage-700 dark:hover:text-sage-400 transition-colors">Lumi AI Companion</Link>
            <Link to="/breathe" className="hover:text-sage-700 dark:hover:text-sage-400 transition-colors">Zen Sanctuary</Link>
            <Link to="/community" className="hover:text-sage-700 dark:hover:text-sage-400 transition-colors">Kindness Wall</Link>
          </div>

          {/* Judging & Demo Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 rounded-xl shadow-xs transition-all hover:scale-105"
              title="Loads pre-seeded 14-day history for judges"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Load Demo Profile</span>
            </button>

            <button
              onClick={handleResetBlank}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-sand-300 bg-white dark:bg-darkbg-card hover:bg-stone-50 dark:hover:bg-darkbg-border border border-sand-300 dark:border-darkbg-border rounded-xl shadow-xs transition-all"
              title="Clear data back to zero logs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
              <span>Fresh Canvas</span>
            </button>
          </div>
        </div>

        {/* Toast confirmation */}
        {toastMsg && (
          <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 text-xs font-bold text-center border border-emerald-300 dark:border-emerald-800 animate-fadeIn">
            ✓ {toastMsg}
          </div>
        )}

        <div className="border-t border-sand-300/40 dark:border-darkbg-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 dark:text-sand-400 gap-3">
          <p className="flex items-center gap-1 text-center sm:text-left">
            Made with <Heart className="w-3.5 h-3.5 text-terracotta-500 fill-terracotta-500 inline" /> for <strong className="text-stone-700 dark:text-sand-300">Human Happiness & Connection</strong>
          </p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
            <span>Multi-User Isolated Storage • Zero External Tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
