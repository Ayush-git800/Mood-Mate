import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Coins,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Volume2,
  VolumeX,
  Palette,
  Award,
  ArrowUpRight,
  Clock,
  Check
} from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { SHOP_ITEMS } from '../data/seedData';
import { toggleAmbientSound } from '../utils/sound';

export default function WalletPage() {
  const {
    happyCoins,
    calmCoins,
    growthCoins,
    transactions,
    unlockedItems,
    unlockItem,
    activeTheme,
    selectTheme,
    activeSound,
    setActiveSound
  } = useWallet();

  const [filterType, setFilterType] = useState('all'); // all, theme, sound, badge
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const handleUnlock = (item) => {
    const result = unlockItem(item.cost, item.id, item.name);
    setFeedbackMsg(result);
    if (result.success) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleSoundToggle = (item) => {
    if (activeSound === item.id) {
      toggleAmbientSound(item.id, false);
      setActiveSound(null);
    } else {
      toggleAmbientSound(item.id, true);
      setActiveSound(item.id);
    }
  };

  const filteredItems = filterType === 'all'
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter(i => i.type === filterType);

  const getCoinSymbol = (type) => {
    if (type === 'happy') return '🟡';
    if (type === 'calm') return '🔵';
    return '🟣';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16">
      {/* Page Title & Philosophy */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-200 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border text-xs font-semibold text-stone-700 dark:text-sand-300">
          <Coins className="w-3.5 h-3.5 text-amber-500" />
          <span>Non-Judgmental Coin Economy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-sand-50 tracking-tight">
          Mood Coins & Self-Care Rewards Hub
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-sand-300 max-w-2xl mx-auto leading-relaxed">
          In MoodMate, <strong>there is never a penalty for sadness or anger</strong>. Every honest check-in
          and somatic pause generates real self-care value you can invest back into your sanctuary.
        </p>
      </div>

      {/* 3 Dedicated Coin Wallets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Happy Coins */}
        <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl">🟡</span>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-200/60 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
              Joy & Gratitude
            </span>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-amber-900 dark:text-amber-100 tracking-tight">
              {happyCoins}
            </div>
            <div className="text-sm font-bold text-amber-800 dark:text-amber-300 mt-1">
              Happy Coins
            </div>
            <p className="text-xs text-stone-600 dark:text-sand-400 mt-2">
              Earned by logging moments of gratitude, joy, and sharing warmth on the Kindness Wall (+15).
            </p>
          </div>
        </div>

        {/* Calm Coins */}
        <div className="p-6 rounded-3xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/60 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl">🔵</span>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-200/60 dark:bg-sky-900/40 text-sky-800 dark:text-sky-300">
              Vulnerability & Peace
            </span>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-sky-900 dark:text-sky-100 tracking-tight">
              {calmCoins}
            </div>
            <div className="text-sm font-bold text-sky-800 dark:text-sky-300 mt-1">
              Calm Coins
            </div>
            <p className="text-xs text-stone-600 dark:text-sand-400 mt-2">
              Earned by honest daily check-ins (+10) and completing mindful breathing cycles (+10).
            </p>
          </div>
        </div>

        {/* Growth Coins */}
        <div className="p-6 rounded-3xl bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/60 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl">🟣</span>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-200/60 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300">
              Action & Reset
            </span>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-purple-900 dark:text-purple-100 tracking-tight">
              {growthCoins}
            </div>
            <div className="text-sm font-bold text-purple-800 dark:text-purple-300 mt-1">
              Growth Coins
            </div>
            <p className="text-xs text-stone-600 dark:text-sand-400 mt-2">
              Earned by completing 30-second somatic micro-challenges & grounding exercises (+20).
            </p>
          </div>
        </div>
      </div>

      {/* Rewards Shop Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-sand-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Self-Care Rewards Shop</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-sand-400">
              Redeem your hard-earned coins for ambient audio, calming themes, and resilience badges.
            </p>
          </div>

          {/* Shop Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-sand-200/80 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border text-xs font-semibold">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'theme', label: 'Themes', icon: Palette },
              { id: 'sound', label: 'Soundscapes', icon: Volume2 },
              { id: 'badge', label: 'Badges', icon: Award }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  filterType === f.id
                    ? 'bg-sage-600 text-white shadow-xs'
                    : 'text-stone-600 dark:text-sand-300 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback alert toast */}
        {feedbackMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3.5 rounded-2xl text-xs font-semibold border ${
              feedbackMsg.success
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
            }`}
          >
            {feedbackMsg.message}
          </motion.div>
        )}

        {/* Rewards Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const isUnlocked = unlockedItems.includes(item.id);
            const isThemeActive = activeTheme === item.id;
            const isSoundActive = activeSound === item.id;

            return (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border shadow-xs flex flex-col justify-between space-y-4 hover:border-sage-400 dark:hover:border-sage-600 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-sand-200 dark:bg-darkbg-surface flex items-center justify-center text-2xl shadow-xs">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-sand-200/80 dark:bg-darkbg-surface text-stone-600 dark:text-sand-300">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 dark:text-sand-100 text-base mt-3">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-sand-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-sand-200 dark:border-darkbg-border flex items-center justify-between">
                  {/* Cost badge */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-sand-300">
                    <span>{getCoinSymbol(item.cost.type)}</span>
                    <span>{item.cost.amount} {item.cost.type} coins</span>
                  </div>

                  {/* Action button */}
                  {isUnlocked ? (
                    <div className="flex items-center gap-1.5">
                      {item.type === 'theme' && (
                        <button
                          onClick={() => selectTheme(item.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isThemeActive
                              ? 'bg-emerald-600 text-white'
                              : 'bg-sand-200 dark:bg-darkbg-surface text-stone-700 dark:text-sand-200 hover:bg-sand-300'
                          }`}
                        >
                          {isThemeActive ? 'Active' : 'Apply'}
                        </button>
                      )}
                      {item.type === 'sound' && (
                        <button
                          onClick={() => handleSoundToggle(item)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            isSoundActive
                              ? 'bg-sage-600 text-white animate-pulse'
                              : 'bg-sand-200 dark:bg-darkbg-surface text-stone-700 dark:text-sand-200 hover:bg-sand-300'
                          }`}
                        >
                          {isSoundActive ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          <span>{isSoundActive ? 'Stop' : 'Play Live'}</span>
                        </button>
                      )}
                      {item.type === 'badge' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <Check className="w-3.5 h-3.5" />
                          <span>Equipped</span>
                        </span>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUnlock(item)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-xs hover:scale-105 transition-all"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Unlock</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction Ledger */}
      <div className="p-6 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-stone-500 dark:text-sand-400" />
            <h3 className="font-bold text-stone-900 dark:text-sand-100 text-base">
              Recent Coin Ledger
            </h3>
          </div>
          <span className="text-xs text-stone-600 dark:text-sand-400 font-medium">
            Full Audit History
          </span>
        </div>

        <div className="divide-y divide-sand-200 dark:divide-darkbg-border">
          {transactions.map((tx) => {
            const isEarn = tx.amount > 0;
            return (
              <div key={tx.id} className="py-3 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-base">{getCoinSymbol(tx.type)}</span>
                  <div>
                    <div className="font-semibold text-stone-800 dark:text-sand-100">
                      {tx.reason}
                    </div>
                    <div className="text-[11px] text-stone-600 dark:text-sand-400">
                      {tx.timestamp}
                    </div>
                  </div>
                </div>

                <div className={`font-mono font-bold ${isEarn ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-500'}`}>
                  {isEarn ? `+${tx.amount}` : tx.amount} {tx.type}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
