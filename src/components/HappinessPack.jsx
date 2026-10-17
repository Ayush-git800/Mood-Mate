import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Quote, Laugh, Trophy, CheckCircle2, Play, Pause, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HAPPINESS_PACKS } from '../data/seedData';
import { useWallet } from '../context/WalletContext';

export default function HappinessPack({ moodId, onChallengeCompleted, challengeDone }) {
  const { addCoins } = useWallet();
  const pack = HAPPINESS_PACKS[moodId] || HAPPINESS_PACKS.happy;

  const [jokeIndex, setJokeIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);

  // 30-second timer state for challenge
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Reset indices or pick randomly when moodId changes
  useEffect(() => {
    setJokeIndex(Math.floor(Math.random() * pack.jokes.length));
    setQuoteIndex(Math.floor(Math.random() * pack.quotes.length));
    setChallengeIndex(Math.floor(Math.random() * pack.challenges.length));
    setIsTimerRunning(false);
    setTimerSeconds(30);
  }, [moodId]);

  // Timer countdown hook
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      handleCompleteChallenge();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleShuffle = () => {
    setJokeIndex((prev) => (prev + 1) % pack.jokes.length);
    setQuoteIndex((prev) => (prev + 1) % pack.quotes.length);
    setChallengeIndex((prev) => (prev + 1) % pack.challenges.length);
    setIsTimerRunning(false);
    setTimerSeconds(30);
  };

  const handleCompleteChallenge = () => {
    if (challengeDone) return;
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#9B72CF', '#E9B949', '#6BA4B8']
    });
    if (onChallengeCompleted) {
      onChallengeCompleted();
    } else {
      addCoins('growth', 20, 'Completed 30-Second Micro-Challenge');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-stone-900 dark:text-sand-100 flex items-center gap-2">
          <span>✨</span>
          <span>Your Personalized Reset Pack</span>
        </h3>
        <button
          onClick={handleShuffle}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-darkbg-card hover:bg-sand-200 dark:hover:bg-darkbg-border border border-sand-300 dark:border-darkbg-border text-xs font-semibold text-stone-700 dark:text-sand-300 shadow-xs hover:scale-105 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Give me another ✨</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Joke */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`joke-${jokeIndex}-${moodId}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col justify-between p-5 rounded-3xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 shadow-xs"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200">
                  <Laugh className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 tracking-wider uppercase">
                  Lighthearted Humor
                </span>
              </div>
              <p className="text-sm text-stone-800 dark:text-sand-200 leading-relaxed font-medium">
                "{pack.jokes[jokeIndex]}"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-700 dark:text-amber-400 font-medium">
              A light smile stimulates dopamine & relaxes facial muscles
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Card 2: Grounding Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`quote-${quoteIndex}-${moodId}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="flex flex-col justify-between p-5 rounded-3xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/60 shadow-xs"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="p-2 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200">
                  <Quote className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-sky-800 dark:text-sky-300 tracking-wider uppercase">
                  Grounding Wisdom
                </span>
              </div>
              <p className="text-sm italic font-serif text-stone-800 dark:text-sand-200 leading-relaxed">
                "{pack.quotes[quoteIndex]}"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-sky-200/60 dark:border-sky-900/40 text-[11px] text-sky-700 dark:text-sky-400 font-medium">
              Thoughtful, non-toxic perspective for emotional anchor
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Card 3: 30-Second Micro-Challenge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`challenge-${challengeIndex}-${moodId}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="flex flex-col justify-between p-5 rounded-3xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/60 shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200">
                    <Trophy className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-purple-800 dark:text-purple-300 tracking-wider uppercase">
                    30s Micro-Reset
                  </span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-200/70 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                  +20 🟣
                </span>
              </div>
              <p className="text-sm font-semibold text-stone-800 dark:text-sand-100 leading-relaxed">
                {pack.challenges[challengeIndex]}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-purple-200/60 dark:border-purple-900/40 space-y-2.5">
              {/* Interactive Countdown */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsTimerRunning(prev => !prev)}
                    className="p-1.5 rounded-lg bg-white dark:bg-darkbg-card border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:scale-105 transition-transform"
                    title={isTimerRunning ? 'Pause timer' : 'Start 30s timer'}
                  >
                    {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(30);
                    }}
                    className="p-1.5 rounded-lg bg-white dark:bg-darkbg-card border border-purple-200 dark:border-purple-800 text-stone-500 hover:text-stone-800 dark:text-sand-400 hover:scale-105 transition-transform"
                    title="Reset timer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300">
                    00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                  </span>
                </div>

                {/* Complete Button */}
                <button
                  type="button"
                  onClick={handleCompleteChallenge}
                  disabled={challengeDone}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    challengeDone
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 cursor-default'
                      : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs hover:scale-105'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{challengeDone ? 'Completed (+20 🟣)' : 'Mark Done'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
