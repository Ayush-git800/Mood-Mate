import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Coins,
  BrainCircuit,
  Heart,
  Wind,
  BarChart3,
  Smile,
  HeartHandshake,
  Users,
  Compass
} from 'lucide-react';
import { MOODS } from '../data/seedData';
import HappinessPack from '../components/HappinessPack';

export default function LandingPage() {
  // Live teaser state
  const [teaserMood, setTeaserMood] = useState(MOODS[0]); // default Happy

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-8">
        {/* Soft atmospheric radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-sage-300/25 dark:bg-sage-900/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 dark:bg-sage-950/60 border border-sage-300 dark:border-sage-800 text-sage-800 dark:text-sage-300 text-xs font-semibold shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
            <span>Built for Human Happiness & Deep Connection</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-stone-900 dark:text-sand-50 tracking-tight leading-[1.15]"
          >
            A kinder way to track your{' '}
            <span className="text-sage-600 dark:text-sage-400 font-serif italic underline decoration-sage-300 dark:decoration-sage-700 decoration-wavy decoration-2">
              emotional weather.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-stone-600 dark:text-sand-300 max-w-2xl mx-auto leading-relaxed"
          >
            No sterile clinical questionnaires. No penalties for bad days. Just gentle validation,
            micro-resets, a zero-judgment coin wallet, and an empathetic companion when things get heavy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <Link
              to="/checkin"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-sm sm:text-base shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/breathe"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sand-200/80 hover:bg-sand-300/80 dark:bg-darkbg-card dark:hover:bg-darkbg-border text-stone-800 dark:text-sand-100 font-semibold text-sm sm:text-base border border-sand-300 dark:border-darkbg-border transition-all"
            >
              <Wind className="w-4 h-4 text-sage-600 dark:text-sage-400" />
              <span>Quick 2-Min Reset</span>
            </Link>
          </motion.div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-stone-700 dark:text-sand-400 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Offline & Private
            </span>
            <span className="flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-500" /> Non-Judgmental Coins
            </span>
            <span className="flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-purple-500" /> Somatic Grounding
            </span>
          </div>
        </div>
      </section>

      {/* Live Community Impact Counter Bar */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-3xl bg-sand-200/70 dark:bg-darkbg-card border border-sand-300/80 dark:border-darkbg-border shadow-xs">
          <div className="text-center space-y-1 p-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-sage-700 dark:text-sage-300 tracking-tight">
              1,428
            </div>
            <div className="text-xs font-semibold text-stone-700 dark:text-sand-400 uppercase tracking-wider">
              Check-ins Today
            </div>
            <div className="text-[11px] text-stone-600 dark:text-sand-400">
              Honest moments logged without judgment
            </div>
          </div>
          <div className="text-center space-y-1 p-2 sm:border-x border-sand-300 dark:border-darkbg-border">
            <div className="text-3xl sm:text-4xl font-extrabold text-sky-700 dark:text-sky-300 tracking-tight">
              12,940
            </div>
            <div className="text-xs font-semibold text-stone-700 dark:text-sand-400 uppercase tracking-wider">
              Mindful Minutes Logged
            </div>
            <div className="text-[11px] text-stone-600 dark:text-sand-400">
              Through Box & 4-7-8 Zen breathing
            </div>
          </div>
          <div className="text-center space-y-1 p-2">
            <div className="text-3xl sm:text-4xl font-extrabold text-terracotta-600 dark:text-terracotta-400 tracking-tight">
              8,762
            </div>
            <div className="text-xs font-semibold text-stone-700 dark:text-sand-400 uppercase tracking-wider">
              Virtual Hugs Sent
            </div>
            <div className="text-[11px] text-stone-600 dark:text-sand-400">
              Shared on the Community Kindness Wall
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Teaser Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className={`p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 bg-gradient-to-b ${teaserMood.tintClass} ${teaserMood.darkTintClass} ${teaserMood.borderColor} shadow-soft`}>
          <div className="text-center max-w-xl mx-auto space-y-2 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 dark:bg-darkbg-card/80 text-stone-700 dark:text-sand-200 border border-sand-300 dark:border-darkbg-border inline-block">
              Interactive Live Preview
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-sand-50">
              Tap an emoji. Experience the reset.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-sand-300">
              Notice how the background tone adapts and gives you a grounded, empathetic reset pack immediately.
            </p>
          </div>

          {/* Quick Emoji Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-6">
            {MOODS.map((m) => {
              const selected = teaserMood.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setTeaserMood(m)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl border text-xs sm:text-sm font-semibold transition-all ${
                    selected
                      ? `${m.borderColor} bg-white dark:bg-darkbg-card shadow-md scale-105 text-stone-900 dark:text-white`
                      : 'border-sand-300/80 bg-white/60 dark:bg-darkbg-card/60 text-stone-600 dark:text-sand-300 hover:scale-102'
                  }`}
                >
                  <span className="text-xl">{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Validation Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-white/85 dark:bg-darkbg-card/85 border border-sand-300/70 dark:border-darkbg-border text-center shadow-xs">
            <p className="text-sm sm:text-base font-medium text-stone-800 dark:text-sand-200">
              "{teaserMood.validationMessage}"
            </p>
          </div>

          {/* Happiness Pack Preview */}
          <HappinessPack moodId={teaserMood.id} />
        </div>
      </section>

      {/* Core 3 Pillars */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-sand-50">
            Why MoodMate feels different
          </h2>
          <p className="text-sm text-stone-600 dark:text-sand-300 max-w-lg mx-auto">
            Traditional trackers treat emotions like test scores. We treat them like natural weather.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center text-xl font-bold">
              🪙
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-sand-100">
              Non-Judgmental Coin Economy
            </h3>
            <p className="text-sm text-stone-600 dark:text-sand-300 leading-relaxed">
              No penalty for feeling down or angry. Every honest check-in earns <strong>Calm Coins 🔵</strong>.
              Micro-resets earn <strong>Growth Coins 🟣</strong>. Redeem them for ambient soundscapes and warm themes.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-sage-100 dark:bg-sage-950/60 text-sage-800 dark:text-sage-300 flex items-center justify-center text-xl font-bold">
              🌿
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-sand-100">
              Lumi 🌿 — Empathetic Companion
            </h3>
            <p className="text-sm text-stone-600 dark:text-sand-300 leading-relaxed">
              Lumi listens without judgment. Equipped with active cognitive reframing and somatic
              5-4-3-2-1 sensory grounding, Lumi helps de-escalate anxiety right when it peaks.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-terracotta-100 dark:bg-terracotta-950/60 text-terracotta-800 dark:text-terracotta-300 flex items-center justify-center text-xl font-bold">
              🫂
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-sand-100">
              Community Kindness Corkboard
            </h3>
            <p className="text-sm text-stone-600 dark:text-sand-300 leading-relaxed">
              Human connection cures isolation. Post encouraging sticky notes, read warm messages
              from fellow students, and send virtual hugs that light up with floating hearts.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access Feature Tiles */}
      <section className="max-w-6xl mx-auto px-4 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-sand-50 text-center">
          Explore the Hub
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/checkin"
            className="group p-5 rounded-3xl bg-sand-200/60 hover:bg-sand-200 dark:bg-darkbg-card dark:hover:bg-darkbg-border border border-sand-300 dark:border-darkbg-border transition-all hover:-translate-y-1 shadow-xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-darkbg-surface flex items-center justify-center text-xl mb-3 shadow-xs">
              😊
            </div>
            <h4 className="font-bold text-stone-900 dark:text-sand-100 group-hover:text-sage-600 transition-colors">
              Daily Mood Sanctuary
            </h4>
            <p className="text-xs text-stone-600 dark:text-sand-400 mt-1">
              8 tactile moods, humor packs, micro-journaling & streak tracker.
            </p>
          </Link>

          <Link
            to="/analytics"
            className="group p-5 rounded-3xl bg-sand-200/60 hover:bg-sand-200 dark:bg-darkbg-card dark:hover:bg-darkbg-border border border-sand-300 dark:border-darkbg-border transition-all hover:-translate-y-1 shadow-xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-darkbg-surface flex items-center justify-center text-xl mb-3 shadow-xs">
              📊
            </div>
            <h4 className="font-bold text-stone-900 dark:text-sand-100 group-hover:text-sage-600 transition-colors">
              Mood Journey & Analytics
            </h4>
            <p className="text-xs text-stone-600 dark:text-sand-400 mt-1">
              Smooth Chart.js curves, this-week vs last-week overlays, and 30-day calendar.
            </p>
          </Link>

          <Link
            to="/breathe"
            className="group p-5 rounded-3xl bg-sand-200/60 hover:bg-sand-200 dark:bg-darkbg-card dark:hover:bg-darkbg-border border border-sand-300 dark:border-darkbg-border transition-all hover:-translate-y-1 shadow-xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-darkbg-surface flex items-center justify-center text-xl mb-3 shadow-xs">
              🌬️
            </div>
            <h4 className="font-bold text-stone-900 dark:text-sand-100 group-hover:text-sage-600 transition-colors">
              Zen Breathing Sanctuary
            </h4>
            <p className="text-xs text-stone-600 dark:text-sand-400 mt-1">
              Box breathing, 4-7-8 relaxing breath with audio cues and coin rewards.
            </p>
          </Link>

          <Link
            to="/community"
            className="group p-5 rounded-3xl bg-sand-200/60 hover:bg-sand-200 dark:bg-darkbg-card dark:hover:bg-darkbg-border border border-sand-300 dark:border-darkbg-border transition-all hover:-translate-y-1 shadow-xs"
          >
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-darkbg-surface flex items-center justify-center text-xl mb-3 shadow-xs">
              💌
            </div>
            <h4 className="font-bold text-stone-900 dark:text-sand-100 group-hover:text-sage-600 transition-colors">
              Kindness Corkboard
            </h4>
            <p className="text-xs text-stone-600 dark:text-sand-400 mt-1">
              Sticky affirmation notes, virtual hugs with floating heart particles.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
