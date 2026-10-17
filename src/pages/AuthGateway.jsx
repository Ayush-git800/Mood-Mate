import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  GraduationCap,
  Target,
  Lock,
  Mail,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FRIENDLY_AVATARS } from '../data/seedData';

export default function AuthGateway() {
  const navigate = useNavigate();
  const { login, register, loginGuest, loadDemo, user } = useAuth();

  const [mode, setMode] = useState('signup'); // 'signup' | 'signin' | 'guest'
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(FRIENDLY_AVATARS[0].emoji);
  const [goal, setGoal] = useState('Build emotional resilience & daily mindful pause');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (mode === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please enter your name or nickname.');
        setLoading(false);
        return;
      }
      const res = register({
        name: name.trim(),
        college: college.trim() || 'Mindful Learner',
        avatar: selectedAvatar,
        goal: goal.trim(),
        email: email.trim(),
        password: password.trim() || 'password123'
      });
      if (!res.success) {
        setErrorMsg(res.message);
        setLoading(false);
        return;
      }
      navigate('/checkin');
    } else if (mode === 'signin') {
      const res = login(email.trim(), password.trim());
      if (!res.success) {
        setErrorMsg(res.message);
        setLoading(false);
        return;
      }
      navigate('/checkin');
    }
    setLoading(false);
  };

  const handleGuestLogin = () => {
    loginGuest();
    navigate('/checkin');
  };

  const handleLoadDemo = () => {
    loadDemo();
    navigate('/analytics');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-xl space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 dark:bg-sage-950/60 border border-sage-300 dark:border-sage-800 text-sage-800 dark:text-sage-300 text-xs font-semibold shadow-xs">
            <span>🌿</span>
            <span>Welcome to Your Everyday Mental Reset Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-sand-50 tracking-tight">
            Step into the Sanctuary
          </h1>
          <p className="text-sm text-stone-600 dark:text-sand-300 max-w-md mx-auto">
            A safe, non-judgmental space designed to help you track your emotional weather and pause.
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex p-1.5 rounded-2xl bg-sand-200/80 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              mode === 'signup'
                ? 'bg-sage-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-sand-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Create Fresh Account
          </button>
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMsg(''); }}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              mode === 'signin'
                ? 'bg-sage-600 text-white shadow-xs'
                : 'text-stone-600 dark:text-sand-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold"
          >
            {errorMsg}
          </motion.div>
        )}

        {/* Main Card */}
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="p-6 sm:p-8 rounded-3xl bg-sand-50 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border shadow-soft space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <>
                {/* Avatar Selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-sand-300 mb-2">
                    Choose Your Friendly Spirit Avatar
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {FRIENDLY_AVATARS.map((av) => {
                      const isSelected = selectedAvatar === av.emoji;
                      return (
                        <button
                          key={av.id}
                          type="button"
                          onClick={() => setSelectedAvatar(av.emoji)}
                          className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-sage-600 text-white border-sage-600 ring-2 ring-sage-400/40 shadow-xs scale-105'
                              : 'bg-white dark:bg-darkbg-surface border-sand-300 dark:border-darkbg-border hover:border-sage-400'
                          }`}
                          title={`${av.label} — ${av.desc}`}
                        >
                          <span className="text-2xl mb-1">{av.emoji}</span>
                          <span className={`text-[10px] font-bold truncate max-w-full ${isSelected ? 'text-white' : 'text-stone-600 dark:text-sand-300'}`}>
                            {av.label.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-sand-300 mb-1">
                    Your Name or Preferred Nickname
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-sm text-stone-900 dark:text-sand-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-sage-500"
                      required
                    />
                  </div>
                </div>

                {/* College / Institution */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-sand-300 mb-1">
                    College / Campus / City (Optional)
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. Design & Tech @ UCLA"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-sm text-stone-900 dark:text-sand-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                </div>

                {/* Primary Emotional Goal */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-sand-300 mb-1">
                    Primary Emotional Goal
                  </label>
                  <div className="relative">
                    <Target className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-xs sm:text-sm text-stone-900 dark:text-sand-100 focus:outline-hidden focus:ring-2 focus:ring-sage-500"
                    >
                      <option value="Manage exam & assignment stress">Manage exam & assignment stress</option>
                      <option value="Build daily mindful pause streak">Build daily mindful pause streak</option>
                      <option value="Reduce social isolation & connect warmly">Reduce social isolation & connect warmly</option>
                      <option value="Overcome overthinking & sleep better">Overcome overthinking & sleep better</option>
                      <option value="Cultivate non-judgmental self-compassion">Cultivate non-judgmental self-compassion</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-sand-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-sm text-stone-900 dark:text-sand-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-sage-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-sand-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-sm text-stone-900 dark:text-sand-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-sage-500"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-bold text-sm shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{mode === 'signup' ? 'Create Fresh Account' : 'Sign In to MoodMate'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Alternatives Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sand-300 dark:border-darkbg-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-sand-50 dark:bg-darkbg-card px-3 text-stone-500 font-semibold">
                Quick Access Options
              </span>
            </div>
          </div>

          {/* Guest and Demo Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-sand-200/80 hover:bg-sand-300/80 dark:bg-darkbg-surface dark:hover:bg-darkbg-border border border-sand-300 dark:border-darkbg-border text-xs font-semibold text-stone-700 dark:text-sand-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Explore as Guest (Fresh)</span>
            </button>

            <button
              type="button"
              onClick={handleLoadDemo}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 border border-amber-300 dark:border-amber-800 text-xs font-bold text-amber-900 dark:text-amber-200 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              title="Loads pre-filled 14-day history, streak & coins for hackathon judges"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Load Demo Profile (14 Days)</span>
            </button>
          </div>
        </motion.div>

        {/* Privacy Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-stone-500 dark:text-sand-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Client-Side Privacy — Your emotional records never leave this browser</span>
        </div>
      </div>
    </div>
  );
}
