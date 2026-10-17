import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play, Pause, RotateCcw, Wind, Sparkles, CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { playBreathCue } from '../utils/sound';

const MODES = [
  {
    id: 'box',
    name: 'Box Breathing',
    tagline: 'Navy SEAL Tactical Calm',
    phases: [
      { name: 'Inhale', duration: 4, scale: 1.45, audio: 'inhale' },
      { name: 'Hold', duration: 4, scale: 1.45, audio: 'hold' },
      { name: 'Exhale', duration: 4, scale: 1, audio: 'exhale' },
      { name: 'Hold', duration: 4, scale: 1, audio: 'hold' }
    ]
  },
  {
    id: '478',
    name: '4-7-8 Relaxing Breath',
    tagline: 'Deep Parasympathetic Sleep & De-stress',
    phases: [
      { name: 'Inhale', duration: 4, scale: 1.45, audio: 'inhale' },
      { name: 'Hold Gently', duration: 7, scale: 1.45, audio: 'hold' },
      { name: 'Slow Exhale', duration: 8, scale: 1, audio: 'exhale' }
    ]
  },
  {
    id: 'energize',
    name: '2-Minute Energizer',
    tagline: 'Quick Oxygenation & Focus',
    phases: [
      { name: 'Inhale', duration: 2, scale: 1.4, audio: 'inhale' },
      { name: 'Exhale', duration: 2, scale: 1, audio: 'exhale' }
    ]
  }
];

export default function BreathePage() {
  const { addCoins } = useWallet();
  const [selectedMode, setSelectedMode] = useState(MODES[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [timeLeftInPhase, setTimeLeftInPhase] = useState(MODES[0].phases[0].duration);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const currentPhase = selectedMode.phases[currentPhaseIndex];

  // Handle mode switch
  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
    setIsRunning(false);
    setCurrentPhaseIndex(0);
    setTimeLeftInPhase(mode.phases[0].duration);
    setCompletedCycles(0);
    setRewardClaimed(false);
  };

  // Main breathing pacer timer loop
  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeftInPhase((prev) => {
          if (prev <= 1) {
            // Transition to next phase
            const nextIndex = (currentPhaseIndex + 1) % selectedMode.phases.length;
            const nextPhase = selectedMode.phases[nextIndex];

            // If we wrapped back to 0, increment cycle count
            if (nextIndex === 0) {
              setCompletedCycles((c) => {
                const newC = c + 1;
                // Award 10 calm coins at 4 cycles!
                if (newC === 4 && !rewardClaimed) {
                  confetti({
                    particleCount: 60,
                    spread: 70,
                    origin: { y: 0.6 }
                  });
                  addCoins('calm', 10, 'Completed 4 Zen Sanctuary breathing cycles');
                  setRewardClaimed(true);
                }
                return newC;
              });
            }

            if (soundEnabled && nextPhase.audio) {
              playBreathCue(nextPhase.audio);
            }

            setCurrentPhaseIndex(nextIndex);
            return nextPhase.duration;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, currentPhaseIndex, selectedMode, soundEnabled, rewardClaimed]);

  const handleToggleRunning = () => {
    if (!isRunning && soundEnabled) {
      playBreathCue(currentPhase.audio);
    }
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentPhaseIndex(0);
    setTimeLeftInPhase(selectedMode.phases[0].duration);
    setCompletedCycles(0);
    setRewardClaimed(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-200 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border text-xs font-semibold text-stone-700 dark:text-sand-300">
          <Wind className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
          <span>Vagus Nerve Regulation Sanctuary</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-sand-50 tracking-tight">
          Zen Sanctuary Breathing Pacer
        </h1>
        <p className="text-sm text-stone-600 dark:text-sand-300 max-w-lg mx-auto">
          Synchronize your breath with the visual orb to downshift cortisol and stimulate parasympathetic calm.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {MODES.map((m) => {
          const isSelected = selectedMode.id === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleSelectMode(m)}
              className={`p-4 rounded-3xl border text-left transition-all ${
                isSelected
                  ? 'bg-white dark:bg-darkbg-card border-sage-500 ring-2 ring-sage-400/20 shadow-soft'
                  : 'bg-sand-50 dark:bg-darkbg-surface border-sand-300 dark:border-darkbg-border hover:border-sage-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900 dark:text-sand-100">{m.name}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-sage-600" />}
              </div>
              <p className="text-xs text-stone-500 dark:text-sand-400 mt-1 leading-snug">
                {m.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Breathing Circle Pacer Arena */}
      <div className="p-8 sm:p-14 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border shadow-xs flex flex-col items-center justify-center relative overflow-hidden min-h-[420px]">
        {/* Ambient atmospheric aura */}
        <div className="absolute inset-0 bg-radial from-sage-200/40 via-transparent to-transparent dark:from-sage-900/20 pointer-events-none" />

        {/* Dynamic Scaling Circle */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-6">
          {/* Subtle outer ripples */}
          <motion.div
            animate={{
              scale: isRunning ? currentPhase.scale * 1.15 : 1,
              opacity: isRunning ? [0.2, 0.4, 0.2] : 0.2
            }}
            transition={{
              duration: currentPhase.duration,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 rounded-full border border-sage-400/40 dark:border-sage-500/30"
          />

          {/* Main Breathing Orb */}
          <motion.div
            animate={{
              scale: isRunning ? currentPhase.scale : 1,
            }}
            transition={{
              duration: currentPhase.duration,
              ease: 'easeInOut'
            }}
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-sage-500 via-sage-400 to-sky-400 shadow-soft-lg flex flex-col items-center justify-center text-white text-center p-4 select-none relative"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight drop-shadow-xs">
              {isRunning ? currentPhase.name : 'Ready'}
            </span>
            <span className="text-3xl font-extrabold font-mono mt-1 drop-shadow-xs">
              {isRunning ? `${timeLeftInPhase}s` : 'Start'}
            </span>
            <span className="text-[11px] font-semibold text-white/90 uppercase tracking-widest mt-1">
              Cycle {completedCycles}/4
            </span>
          </motion.div>
        </div>

        {/* Milestone Banner (4 Cycles -> +10 Coins) */}
        {completedCycles >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-bold mb-4"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>4 Cycles Complete! Earned +10 🔵 Calm Coins</span>
          </motion.div>
        )}

        {/* Controls Bar */}
        <div className="flex items-center gap-3 pt-4 z-10">
          <button
            onClick={handleToggleRunning}
            className={`px-6 py-3 rounded-2xl font-bold text-sm shadow-soft hover:scale-105 transition-all flex items-center gap-2 text-white ${
              isRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-sage-600 hover:bg-sage-700'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>{completedCycles > 0 ? 'Resume Breath' : 'Begin Breathing'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-3 rounded-2xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-stone-600 dark:text-sand-300 hover:bg-sand-200 transition-colors"
            title="Reset Pacer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            className="p-3 rounded-2xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-stone-600 dark:text-sand-300 hover:bg-sand-200 transition-colors"
            title={soundEnabled ? 'Disable Chimes' : 'Enable Chimes'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-sage-600" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>
        </div>
      </div>
    </div>
  );
}
