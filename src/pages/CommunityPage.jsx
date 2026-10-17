import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  HeartHandshake,
  Plus,
  Heart,
  Sparkles,
  X,
  Send,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { storageService } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { playCoinSound } from '../utils/sound';

const NOTE_TINTS = [
  { label: 'Amber Warmth', bg: 'bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100' },
  { label: 'Sage Peace', bg: 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100' },
  { label: 'Sky Breath', bg: 'bg-sky-100 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800 text-sky-950 dark:text-sky-100' },
  { label: 'Rose Kindness', bg: 'bg-rose-100 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100' },
  { label: 'Gentle Lilac', bg: 'bg-purple-100 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 text-purple-950 dark:text-purple-100' }
];

export default function CommunityPage() {
  const { user } = useAuth();
  const { addCoins } = useWallet();

  const [notes, setNotes] = useState(() => storageService.getKindnessNotes());
  const [selectedTag, setSelectedTag] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Note Form State
  const [newAvatar, setNewAvatar] = useState('💌');
  const [newTint, setNewTint] = useState(NOTE_TINTS[0].bg);
  const [newTag, setNewTag] = useState('Encouragement');
  const [newMessage, setNewMessage] = useState('');
  const [justHuggedId, setJustHuggedId] = useState(null);

  const tags = ['All', 'Encouragement', 'Healing', 'Warmth', 'Solidarity', 'Perspective', 'Pure Joy'];

  const filteredNotes = selectedTag === 'All'
    ? notes
    : notes.filter(n => n.tag === selectedTag);

  // Send Virtual Hug
  const handleSendHug = (noteId) => {
    // Floating hearts confetti burst
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#F43F5E', '#FB7185', '#FDA4AF']
    });

    setJustHuggedId(noteId);
    setTimeout(() => setJustHuggedId(null), 1000);

    const updated = notes.map(n => {
      if (n.id === noteId) {
        return { ...n, hugs: n.hugs + 1 };
      }
      return n;
    });

    setNotes(updated);
    storageService.saveKindnessNotes(updated);
  };

  // Submit New Note
  const handleSubmitNote = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newNote = {
      id: 'note-' + Date.now(),
      author: `${user.name} (${user.goal.split(' ')[0]} seeker)`,
      avatar: newAvatar,
      color: newTint,
      message: newMessage.trim(),
      hugs: 1,
      tag: newTag,
      timestamp: 'Just now'
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    storageService.saveKindnessNotes(updated);

    // Reward user with 15 Happy Coins for passing kindness
    addCoins('happy', 15, 'Posted encouragement note on Kindness Wall');

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setNewMessage('');
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-200 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border text-xs font-semibold text-stone-700 dark:text-sand-300">
          <HeartHandshake className="w-3.5 h-3.5 text-terracotta-500" />
          <span>Shared Emotional Community</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-sand-50 tracking-tight">
          Community Kindness Corkboard
        </h1>
        <p className="text-sm text-stone-600 dark:text-sand-300 max-w-lg mx-auto">
          Read gentle affirmations from peers facing the same storms, leave your own note, and send warm virtual hugs.
        </p>
      </div>

      {/* Action Bar: Tag Filters & Post Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedTag === t
                  ? 'bg-sage-600 text-white shadow-xs'
                  : 'bg-sand-200/80 dark:bg-darkbg-card text-stone-600 dark:text-sand-300 hover:bg-sand-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Post Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white font-bold text-xs shadow-soft hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post a Kindness Note (+15 🟡)</span>
        </button>
      </div>

      {/* Corkboard Grid of Sticky Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => {
          const isJustHugged = justHuggedId === note.id;

          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, rotate: -0.5 }}
              transition={{ duration: 0.2 }}
              className={`p-6 rounded-3xl border shadow-soft flex flex-col justify-between space-y-4 ${note.color} transition-all relative overflow-hidden`}
            >
              {/* Virtual Hug Burst Floating Tag */}
              {isJustHugged && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1.2, y: -20 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-4 right-4 pointer-events-none text-xl"
                >
                  🫂💖
                </motion.div>
              )}

              <div>
                {/* Author and Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{note.avatar}</span>
                    <span className="font-bold text-xs">{note.author}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 uppercase tracking-wider">
                    {note.tag}
                  </span>
                </div>

                {/* Message */}
                <p className="text-sm font-medium leading-relaxed font-sans">
                  "{note.message}"
                </p>
              </div>

              {/* Card Footer: Timestamp and Send Hug Button */}
              <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] opacity-75 font-medium">{note.timestamp}</span>

                <button
                  type="button"
                  onClick={() => handleSendHug(note.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/70 dark:bg-darkbg-card/70 hover:bg-white dark:hover:bg-darkbg-card font-bold text-xs shadow-xs hover:scale-108 transition-all cursor-pointer"
                  title="Send a warm virtual hug"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>{note.hugs} Hugs</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal: Post a Kindness Note */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-sand-100 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border rounded-3xl p-6 sm:p-7 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💌</span>
                  <h3 className="font-bold text-lg text-stone-900 dark:text-sand-100">
                    Post a Kindness Note
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl text-stone-500 hover:text-stone-800 dark:text-sand-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitNote} className="space-y-4">
                {/* Note Tint Selector */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-sand-300 mb-1.5">
                    Choose Card Paper Tint
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {NOTE_TINTS.map((t, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewTint(t.bg)}
                        className={`h-9 rounded-xl border transition-all ${t.bg} ${
                          newTint === t.bg ? 'ring-2 ring-stone-900 dark:ring-white scale-105' : 'opacity-70'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Tag and Avatar */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-sand-300 mb-1">
                      Category Tag
                    </label>
                    <select
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-xs text-stone-900 dark:text-sand-100"
                    >
                      {tags.filter(t => t !== 'All').map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-sand-300 mb-1">
                      Emoji Stamp
                    </label>
                    <div className="flex items-center gap-1.5">
                      {['💌', '🌸', '🌱', '☀️', '🐾'].map(e => (
                        <button
                          key={e}
                          type="button"
                          onClick={() => setNewAvatar(e)}
                          className={`p-1.5 rounded-lg text-sm border transition-all ${
                            newAvatar === e ? 'bg-sage-600 text-white' : 'bg-white dark:bg-darkbg-surface border-sand-300'
                          }`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message textarea */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-sand-300 mb-1">
                    Your Warm Encouragement
                  </label>
                  <textarea
                    rows={3}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Share something genuine, comforting, or hopeful for someone reading this today..."
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white dark:bg-darkbg-surface border border-sand-300 dark:border-darkbg-border text-sm text-stone-900 dark:text-sand-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-sage-500"
                    required
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-sand-300 hover:bg-sand-200 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold rounded-xl shadow-soft transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Pin Note & Collect +15 🟡</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
