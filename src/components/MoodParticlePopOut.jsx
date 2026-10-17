import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

/**
 * Dynamic Visual Reaction Graphic Pop-Out
 * Triggers a distinct, cinematic particle & visual effect for each of the 8 moods.
 */
export default function MoodParticlePopOut({ activeMood, onAnimationComplete }) {
  useEffect(() => {
    if (!activeMood) return;

    const moodId = activeMood.id;

    if (moodId === 'happy') {
      // Shower of gold sparkle stars and yellow hearts
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#FBBF24', '#FDE68A', '#FEF3C7'],
        shapes: ['circle', 'square']
      });
    } else if (moodId === 'excited') {
      // High-energy multi-color confetti fountain
      confetti({
        particleCount: 90,
        spread: 120,
        startVelocity: 45,
        origin: { y: 0.65 },
        colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6']
      });
    } else if (moodId === 'bored') {
      // Pop of geometric confetti to spark energy
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#06B6D4', '#EC4899', '#F97316', '#84CC16'],
        scalar: 1.2
      });
    } else if (moodId === 'angry') {
      // Firework sparks that transition into calming leaves
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EF4444', '#F87171', '#34D399', '#059669']
      });
    } else if (moodId === 'sad') {
      // Soft gentle droplets
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.4 },
        colors: ['#38BDF8', '#7DD3FC', '#BAE6FD'],
        gravity: 0.8,
        ticks: 200
      });
    }

    const timer = setTimeout(() => {
      if (onAnimationComplete) onAnimationComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [activeMood]);

  if (!activeMood) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
        {/* 😊 HAPPY: Floating Stars & Yellow Hearts */}
        {activeMood.id === 'happy' && (
          <div className="relative w-full h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0.3,
                  x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 200 + 40),
                  y: 50
                }}
                animate={{
                  opacity: [0, 1, 0.8, 0],
                  scale: [0.5, 1.4, 1.2, 0.2],
                  y: -300 - Math.random() * 150,
                  rotate: [0, (i % 2 === 0 ? 1 : -1) * 35]
                }}
                transition={{ duration: 2, ease: 'easeOut', delay: i * 0.08 }}
                className="absolute left-1/2 top-1/2 text-3xl sm:text-4xl filter drop-shadow-md"
              >
                {i % 2 === 0 ? '💛' : '✨'}
              </motion.div>
            ))}
          </div>
        )}

        {/* 😢 SAD: Soft Floating Rain Droplets with Gentle Ripples */}
        {activeMood.id === 'sad' && (
          <div className="relative w-full h-full flex items-center justify-center">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: -250,
                  x: (i - 7) * 45 + (Math.random() * 20 - 10)
                }}
                animate={{
                  opacity: [0, 0.9, 0.9, 0],
                  y: 200,
                  scale: [0.8, 1, 1.2, 0.4]
                }}
                transition={{ duration: 1.8, ease: 'easeInOut', delay: i * 0.09 }}
                className="absolute text-2xl text-sky-400 drop-shadow-sm"
              >
                💧
              </motion.div>
            ))}
            {/* Ripple rings */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="w-48 h-48 rounded-full border-2 border-sky-400/50 absolute"
            />
          </div>
        )}

        {/* 😰 STRESSED: Exhaling Mist / Vapor Cloud Expanding & Fading */}
        {activeMood.id === 'stressed' && (
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.2, opacity: 0.9, filter: 'blur(4px)' }}
              animate={{
                scale: [0.4, 2.5, 3.8],
                opacity: [0.8, 0.5, 0],
                filter: ['blur(4px)', 'blur(20px)', 'blur(40px)']
              }}
              transition={{ duration: 2.1, ease: 'easeOut' }}
              className="w-64 h-64 rounded-full bg-gradient-to-tr from-terracotta-400/40 via-sand-200/50 to-sage-300/30"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 1, 0], y: -50 }}
              transition={{ duration: 2 }}
              className="absolute text-center bg-white/90 dark:bg-darkbg-card/90 px-4 py-2 rounded-2xl border border-terracotta-200 dark:border-terracotta-800 shadow-lg text-sm font-semibold text-terracotta-800 dark:text-terracotta-200"
            >
              💨 Exhaling tension... releasing heavy shoulders
            </motion.div>
          </div>
        )}

        {/* 😴 TIRED: Floating Crescent Moon and Purple "Zzz" Drifting Upward */}
        {activeMood.id === 'tired' && (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.3, 1.2, 0.8],
                y: -60
              }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
              className="text-6xl filter drop-shadow-lg"
            >
              🌙
            </motion.div>
            {['Z', 'z', 'z', '💤'].map((char, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -140 - i * 35,
                  x: 30 + i * 20
                }}
                transition={{ duration: 1.8, delay: 0.2 + i * 0.25, ease: 'easeOut' }}
                className="absolute text-purple-400 font-extrabold font-mono text-2xl sm:text-3xl"
              >
                {char}
              </motion.div>
            ))}
          </div>
        )}

        {/* 😠 ANGRY: Firework Sparks Cooling Down into Soft Calming Leaves */}
        {activeMood.id === 'angry' && (
          <div className="relative w-full h-full flex items-center justify-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`spark-${i}`}
                initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                animate={{
                  opacity: [1, 0.8, 0],
                  scale: [0.5, 1.2, 0.2],
                  x: Math.cos((i * Math.PI) / 4) * 160,
                  y: Math.sin((i * Math.PI) / 4) * 160
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute text-2xl"
              >
                💥
              </motion.div>
            ))}
            {/* Calming green leaves falling inward */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`leaf-${i}`}
                initial={{ opacity: 0, scale: 0.2, y: -100, x: (i - 3) * 60 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.4, 1.2, 0.8],
                  y: 40 + i * 15,
                  rotate: [-30, 45]
                }}
                transition={{ duration: 1.6, delay: 0.5 + i * 0.15, ease: 'easeInOut' }}
                className="absolute text-3xl"
              >
                🍃
              </motion.div>
            ))}
          </div>
        )}

        {/* 😐 BORED: Bouncing Geometric Confetti Pop */}
        {activeMood.id === 'bored' && (
          <div className="relative w-full h-full flex items-center justify-center">
            {['🟡', '🔷', '🔶', '🟩', '🟣', '⚡'].map((shape, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.5, 1],
                  y: [0, -120 - Math.random() * 50, 40],
                  x: (i - 2.5) * 70
                }}
                transition={{ duration: 1.8, ease: 'easeOut', delay: i * 0.08 }}
                className="absolute text-3xl filter drop-shadow-md"
              >
                {shape}
              </motion.div>
            ))}
          </div>
        )}

        {/* 😟 ANXIOUS: Grounding Glowing Circle Expanding & Anchoring Downward */}
        {activeMood.id === 'anxious' && (
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 1.8, 2.4],
                opacity: [0.8, 0.4, 0]
              }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="w-56 h-56 rounded-full border-4 border-emerald-400/60 bg-emerald-500/10 absolute"
            />
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="p-3.5 rounded-2xl bg-white/95 dark:bg-darkbg-card/95 border border-emerald-300 dark:border-emerald-800 text-center shadow-lg"
            >
              <div className="text-2xl mb-1">⚓</div>
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Grounding to solid ground. You are safe right now.
              </p>
            </motion.div>
          </div>
        )}

        {/* 🤩 EXCITED: Multi-Color Fountain & Popper */}
        {activeMood.id === 'excited' && (
          <div className="relative w-full h-full flex items-center justify-center">
            {['🎉', '✨', '🚀', '🌟', '🥳', '🔥'].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.2, y: 80, x: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.2, 1.6, 1.2],
                  y: -180 - Math.random() * 80,
                  x: (i - 2.5) * 80
                }}
                transition={{ duration: 1.8, delay: i * 0.07, ease: 'backOut' }}
                className="absolute text-4xl filter drop-shadow-md"
              >
                {p}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
