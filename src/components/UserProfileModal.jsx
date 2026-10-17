import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Flame, Target, Sparkles, Check, GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FRIENDLY_AVATARS } from '../data/seedData';

export default function UserProfileModal() {
  const { user, updateUser, logout, isProfileModalOpen, closeProfileModal } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [college, setCollege] = useState(user?.college || '');
  const [avatar, setAvatar] = useState(user?.avatar || '🌱');
  const [goal, setGoal] = useState(user?.goal || '');
  const [savedAlert, setSavedAlert] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setCollege(user.college || '');
      setAvatar(user.avatar || '🌱');
      setGoal(user.goal || '');
    }
  }, [user]);

  if (!isProfileModalOpen || !user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      name: name.trim() || 'Mindful Soul',
      college: college.trim(),
      avatar,
      goal: goal.trim() || 'Cultivate steady emotional wellness'
    });
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      closeProfileModal();
    }, 800);
  };

  const handleLogout = () => {
    closeProfileModal();
    logout();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProfileModal}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
        />

        {/* Modal card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          className="relative w-full max-w-md bg-sand-100 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border rounded-3xl p-6 sm:p-7 shadow-2xl z-10 space-y-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sage-100 dark:bg-sage-950 border border-sage-300 dark:border-sage-800 flex items-center justify-center text-2xl shadow-inner">
                {avatar}
              </div>
              <div>
                <h3 className="font-bold text-lg text-stone-900 dark:text-sand-100">
                  {user.name}
                </h3>
                <p className="text-xs text-stone-500 dark:text-sand-400">
                  {user.college || 'Mindful Member'} • {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={closeProfileModal}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-sand-200/80 dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-terracotta-600 dark:text-terracotta-400 font-bold text-base">
                <Flame className="w-4 h-4 fill-terracotta-500 text-terracotta-500 animate-pulse" />
                <span>{user.streak || 0} Days</span>
              </div>
              <div className="text-[11px] text-stone-500 dark:text-sand-400 font-medium">Active Streak</div>
            </div>
            <div className="border-l border-sand-300 dark:border-darkbg-border">
              <div className="text-stone-800 dark:text-sand-200 font-bold text-base">
                {user.joinedDate || 'Recent'}
              </div>
              <div className="text-[11px] text-stone-500 dark:text-sand-400 font-medium">Member Since</div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-sand-300 mb-1.5">
                Choose Avatar Spirit
              </label>
              <div className="grid grid-cols-6 gap-2">
                {FRIENDLY_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setAvatar(av.emoji)}
                    className={`h-10 rounded-xl text-lg flex items-center justify-center transition-all ${
                      avatar === av.emoji
                        ? 'bg-sage-600 text-white ring-2 ring-sage-500 ring-offset-2 dark:ring-offset-darkbg-card scale-105'
                        : 'bg-white dark:bg-darkbg-surface hover:bg-sand-200 border border-sand-300 dark:border-darkbg-border'
                    }`}
                    title={av.label}
                  >
                    {av.emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-sand-300 mb-1">
                Your Preferred Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-stone-900 dark:text-sand-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-sand-300 mb-1">
                College or Campus
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. Stanford / State College"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-stone-900 dark:text-sand-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-sand-300 mb-1">
                Primary Emotional Goal
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-stone-900 dark:text-sand-100 text-sm focus:outline-hidden focus:ring-2 focus:ring-sage-500"
                required
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="py-2.5 px-3 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeProfileModal}
                  className="py-2.5 px-3 text-xs font-semibold text-stone-600 dark:text-sand-300 hover:bg-sand-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-4 bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold rounded-xl shadow-soft transition-all flex items-center gap-1.5"
                >
                  {savedAlert ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
