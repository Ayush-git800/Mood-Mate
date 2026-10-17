import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CheckSquare,
  Square,
  Music,
  ExternalLink,
  Play,
  X,
  Sparkles,
  Trophy,
  CheckCircle2
} from 'lucide-react';
import { MOOD_TASKS, MOOD_MUSIC } from '../data/seedData';
import { useWallet } from '../context/WalletContext';

export default function MoodTasksAndMusic({ moodId }) {
  const { completedTasks, completeMicroTask } = useWallet();
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const tasks = MOOD_TASKS[moodId] || MOOD_TASKS.happy;
  const soundscapes = MOOD_MUSIC[moodId] || MOOD_MUSIC.happy;

  const allCompleted = tasks.every((t) => !!completedTasks[t.id]);

  const handleToggleTask = (task) => {
    if (completedTasks[task.id]) return; // already done

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#9B72CF', '#E9B949', '#6BA4B8']
    });

    completeMicroTask(task.id, task.title);
  };

  const handleCompleteAll = () => {
    let completedAny = false;
    tasks.forEach((t) => {
      if (!completedTasks[t.id]) {
        completeMicroTask(t.id, t.title);
        completedAny = true;
      }
    });

    if (completedAny) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#9B72CF', '#E9B949', '#4B7C59']
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Tailored Micro-Tasks */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-darkbg-card/80 border border-sand-300/80 dark:border-darkbg-border shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
              <CheckSquare className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-sand-100">
                Actionable Reset Tasks
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-sand-400">
                Check off to earn +15 🟣 Growth Coins each
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCompleteAll}
            disabled={allCompleted}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              allCompleted
                ? 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 opacity-80 cursor-default'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs hover:scale-105'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{allCompleted ? 'All Done! ✨' : 'Complete All Tasks'}</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {tasks.map((task) => {
            const isDone = !!completedTasks[task.id];
            return (
              <motion.button
                key={task.id}
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleToggleTask(task)}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                  isDone
                    ? 'bg-purple-50/60 dark:bg-purple-950/20 border-purple-300 dark:border-purple-800/60 opacity-85'
                    : 'bg-sand-50/80 dark:bg-darkbg-surface border-sand-300/70 dark:border-darkbg-border hover:border-purple-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <div className="w-5 h-5 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      ✓
                    </div>
                  ) : (
                    <Square className="w-5 h-5 text-stone-400 dark:text-sand-400" />
                  )}
                </div>

                <div className="flex-1">
                  <div className={`text-xs sm:text-sm font-semibold ${isDone ? 'line-through text-stone-400 dark:text-sand-500' : 'text-stone-900 dark:text-sand-100'}`}>
                    {task.title}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-sand-400 mt-0.5">
                    {task.hint}
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 shrink-0">
                  {isDone ? 'Completed' : '+15 🟣'}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 2. Curated YouTube Music Sanctuary */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-darkbg-card/80 border border-sand-300/80 dark:border-darkbg-border shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
              <Music className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-sand-100">
                Curated Soundscape Sanctuary
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-sand-400">
                Click to open YouTube streams safely in a new tab 🎵
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
            Ad-Free
          </span>
        </div>

        <div className="space-y-2.5">
          {soundscapes.map((track) => (
            <div
              key={track.id}
              className="p-3.5 rounded-2xl bg-sand-50/80 dark:bg-darkbg-surface border border-sand-300/70 dark:border-darkbg-border flex items-center justify-between gap-3 hover:border-amber-300 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                  🎵
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-stone-900 dark:text-sand-100 leading-snug">
                    {track.title}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-stone-500 dark:text-sand-400 mt-0.5">
                    <span>{track.genre}</span>
                    <span>•</span>
                    <span>{track.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Embedded preview modal */}
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(track)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sand-200 dark:bg-darkbg-card hover:bg-sand-300 text-stone-700 dark:text-sand-200 font-bold text-xs transition-all"
                  title="Preview in-app"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Preview</span>
                </button>

                {/* Direct Safe New-Tab YouTube Link */}
                <a
                  href={`https://www.youtube.com/watch?v=${track.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs hover:scale-105 transition-all"
                  title="Open YouTube video in new tab"
                >
                  <span>🎵 Open</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded YouTube Player Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideoModal(null)}
              className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl p-5 shadow-2xl z-10 space-y-4"
            >
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎵</span>
                  <div>
                    <h4 className="font-bold text-sm text-sand-50 truncate max-w-md">
                      {activeVideoModal.title}
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      {activeVideoModal.genre} • Curated Soundscape
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* YouTube Iframe embed */}
              <div className="relative pt-[56.25%] rounded-2xl overflow-hidden bg-black shadow-inner">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
                <span>🎵 Playing frequency stream</span>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideoModal.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(null)}
                    className="text-stone-300 hover:text-white font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
