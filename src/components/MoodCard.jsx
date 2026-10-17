import React from 'react';
import { motion } from 'framer-motion';

export default function MoodCard({ mood, isSelected, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(mood)}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl border-2 transition-all cursor-pointer text-center group ${
        isSelected
          ? `${mood.borderColor} shadow-soft-lg ring-4 ring-sage-400/30 scale-105 bg-white dark:bg-darkbg-card`
          : 'border-sand-300/80 dark:border-darkbg-border bg-sand-50/80 dark:bg-darkbg-card/70 hover:border-sage-300 dark:hover:border-sage-800'
      }`}
    >
      {isSelected && (
        <motion.div
          layoutId="selectedIndicator"
          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-sage-600 text-white flex items-center justify-center text-xs font-bold shadow-xs"
        >
          ✓
        </motion.div>
      )}

      {/* Emoji display */}
      <span className="text-4xl sm:text-5xl mb-2 filter drop-shadow-xs group-hover:rotate-6 transition-transform duration-200">
        {mood.emoji}
      </span>

      {/* Mood label */}
      <span className={`text-sm font-semibold tracking-tight ${
        isSelected ? 'text-stone-900 dark:text-sand-100 font-bold' : 'text-stone-700 dark:text-sand-300'
      }`}>
        {mood.label}
      </span>

      {/* Valence Indicator pill */}
      <span className="text-[10px] text-stone-600 dark:text-sand-400 font-medium mt-1">
        Valence {mood.valence}/8
      </span>
    </motion.button>
  );
}
