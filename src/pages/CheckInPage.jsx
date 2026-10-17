import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ArrowRight, BookOpen, Heart, Flame } from 'lucide-react';
import { MOODS } from '../data/seedData';
import MoodCard from '../components/MoodCard';
import HappinessPack from '../components/HappinessPack';
import MoodParticlePopOut from '../components/MoodParticlePopOut';
import MoodTasksAndMusic from '../components/MoodTasksAndMusic';
import { useMood } from '../context/MoodContext';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';

export default function CheckInPage() {
  const navigate = useNavigate();
  const { logMood } = useMood();
  const { user } = useAuth();
  const { calmCoins } = useWallet();

  const [selectedMood, setSelectedMood] = useState(MOODS[0]); // default Happy
  const [popOutMood, setPopOutMood] = useState(null); // Triggers particle explosion
  const [journalNote, setJournalNote] = useState('');
  const [challengeDone, setChallengeDone] = useState(false);
  const [completedLog, setCompletedLog] = useState(null);

  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
    setChallengeDone(false); // Reset challenge state for new mood
    setPopOutMood(mood); // Trigger full-screen visual particle pop-out!
  };

  const handleCompleteCheckIn = (e) => {
    e.preventDefault();

    // Trigger gentle celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4B7C59', '#E9B949', '#6BA4B8', '#9B72CF']
    });

    const entry = logMood({
      mood: selectedMood.id,
      valence: selectedMood.valence,
      emoji: selectedMood.emoji,
      note: journalNote,
      challengeCompleted: challengeDone
    });

    setCompletedLog(entry);
  };

  return (
    <div
      className={`min-h-[85vh] rounded-3xl p-4 sm:p-8 transition-colors duration-500 bg-gradient-to-b ${selectedMood.tintClass} ${selectedMood.darkTintClass} border border-sand-300/80 dark:border-darkbg-border relative`}
    >
      {/* Dynamic Reaction Graphic Pop-Out Particle Explosion */}
      <MoodParticlePopOut
        activeMood={popOutMood}
        onAnimationComplete={() => setPopOutMood(null)}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/70 dark:bg-darkbg-card/70 border border-sand-300 dark:border-darkbg-border text-xs font-semibold text-stone-700 dark:text-sand-300 shadow-xs">
            <span>🌿</span>
            <span>Welcome, {user?.name || 'Mindful Friend'}</span>
            <span className="w-1 h-1 rounded-full bg-stone-400" />
            <span className="text-terracotta-600 dark:text-terracotta-400 font-bold flex items-center gap-0.5">
              <Flame className="w-3.5 h-3.5 fill-current inline" /> {user?.streak || 0}d streak
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-sand-50 tracking-tight">
            The Daily Mood Sanctuary
          </h1>
          <p className="text-sm text-stone-600 dark:text-sand-300 max-w-lg mx-auto">
            Check in honestly. Every emotional weather state is welcomed with kindness and earns Calm Coins.
          </p>
        </div>

        {/* 8 Tactile Mood Buttons */}
        <div>
          <label className="block text-xs font-bold text-stone-500 dark:text-sand-400 uppercase tracking-wider text-center mb-3">
            Select your current emotional weather (Tap for dynamic particle burst)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {MOODS.map((mood) => (
              <MoodCard
                key={mood.id}
                mood={mood}
                isSelected={selectedMood.id === mood.id}
                onSelect={handleSelectMood}
              />
            ))}
          </div>
        </div>

        {/* Empathetic Validation Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMood.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-5 rounded-3xl bg-white/85 dark:bg-darkbg-card/90 border border-sand-300/80 dark:border-darkbg-border shadow-xs flex items-center gap-3.5"
          >
            <div className="w-12 h-12 rounded-2xl bg-sand-100 dark:bg-darkbg-surface flex items-center justify-center text-3xl shrink-0 shadow-inner">
              {selectedMood.emoji}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-sand-400 block">
                Validation & Anchor
              </span>
              <p className="text-sm sm:text-base font-medium text-stone-800 dark:text-sand-200 leading-snug">
                "{selectedMood.validationMessage}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mood-Specific Tasks & Curated YouTube Music Sanctuary */}
        <MoodTasksAndMusic moodId={selectedMood.id} />

        {/* The Happiness Pack (3 clean cards: Joke, Quote, Micro-Challenge) */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/70 dark:bg-darkbg-card/70 border border-sand-300/80 dark:border-darkbg-border shadow-xs backdrop-blur-xs">
          <HappinessPack
            moodId={selectedMood.id}
            challengeDone={challengeDone}
            onChallengeCompleted={() => setChallengeDone(true)}
          />
        </div>

        {/* Micro-Journal & Check-In Action Card */}
        <form onSubmit={handleCompleteCheckIn} className="space-y-4">
          <div className="p-5 rounded-3xl bg-white/90 dark:bg-darkbg-card/90 border border-sand-300/80 dark:border-darkbg-border shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="journalPrompt"
                className="text-xs font-bold text-stone-700 dark:text-sand-300 flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-sage-600" />
                <span>Micro-Journal Prompt (Optional)</span>
              </label>
              <span className="text-[11px] text-stone-600 dark:text-sand-400 font-medium">
                Keep it brief & honest
              </span>
            </div>
            <input
              id="journalPrompt"
              type="text"
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder="What shaped your day today? (e.g. Midterm prep, evening walk with friends, needed a quiet breath)"
              className="w-full px-4 py-3 rounded-2xl bg-sand-50 dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-sm text-stone-900 dark:text-sand-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-sage-500"
            />
          </div>

          {/* Complete Check-In Action Button */}
          {!completedLog ? (
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-bold text-base shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
              <span>Complete Check-In (+10 🔵 Calm Coins)</span>
              {challengeDone && <span className="text-xs bg-purple-700/60 px-2 py-0.5 rounded-full">+20 🟣</span>}
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-4 shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                  Check-in Successfully Recorded!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                  You earned <strong>+10 Calm Coins</strong> and kept your {user?.streak || 1}-day streak burning bright.
                  {completedLog.coinsEarned.happy > 0 && ` +${completedLog.coinsEarned.happy} Happy Coins!`}
                  {completedLog.coinsEarned.growth > 0 && ` +${completedLog.coinsEarned.growth} Growth Coins!`}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  to="/analytics"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <span>View in Joyful Graph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/wallet"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-darkbg-card border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 font-semibold text-xs hover:bg-emerald-100/50 transition-colors"
                >
                  <span>Visit Rewards Hub</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setCompletedLog(null);
                    setJournalNote('');
                    setChallengeDone(false);
                  }}
                  className="text-xs text-stone-500 hover:text-stone-800 dark:text-sand-400 dark:hover:text-white px-2 py-1"
                >
                  Log Another
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
