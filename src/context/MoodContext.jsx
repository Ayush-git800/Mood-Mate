import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../utils/storage';
import { useWallet } from './WalletContext';
import { useAuth } from './AuthContext';

const MoodContext = createContext();

export function MoodProvider({ children }) {
  const { user } = useAuth();
  const { addCoins, refreshWallet } = useWallet();
  const [history, setHistory] = useState(() => storageService.getHistory());

  // Sync history whenever active user changes
  useEffect(() => {
    setHistory(storageService.getHistory());
  }, [user?.id]);

  /**
   * Complete a mood check-in
   * @param {{ mood: string, valence: number, emoji: string, note?: string, challengeCompleted?: boolean }} entry
   */
  const logMood = ({ mood, valence, emoji, note = '', challengeCompleted = false }) => {
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[today.getDay()];
    const dateStr = today.toISOString().split('T')[0];

    let calmAward = 10; // Every honest check-in gives +10 Calm Coins
    let happyAward = (mood === 'happy' || mood === 'excited') ? 15 : 0;
    let growthAward = challengeCompleted ? 20 : 0;

    const newEntry = {
      id: 'log-' + Date.now(),
      date: dateStr,
      dayName,
      mood,
      valence,
      emoji,
      note: note.trim() || 'Mindful daily pause.',
      coinsEarned: {
        calm: calmAward,
        happy: happyAward,
        growth: growthAward
      },
      timestamp: Date.now()
    };

    const updated = storageService.addMoodEntry(newEntry);
    setHistory(updated);

    // Award coins in wallet
    addCoins('calm', calmAward, 'Honest Daily Check-in');
    if (happyAward > 0) {
      setTimeout(() => {
        addCoins('happy', happyAward, 'Logged joy & high energy');
      }, 250);
    }
    if (growthAward > 0) {
      setTimeout(() => {
        addCoins('growth', growthAward, 'Completed 30-Second Micro-Challenge');
      }, 500);
    }

    return newEntry;
  };

  /**
   * Reset or clear user history
   */
  const clearCurrentHistory = () => {
    const data = storageService.getCurrentUserData();
    if (data) {
      const updated = { ...data, history: [], streak: 0 };
      storageService.saveCurrentUserData(updated);
      setHistory([]);
    }
  };

  return (
    <MoodContext.Provider
      value={{
        history,
        logMood,
        clearCurrentHistory,
        refreshHistory: () => setHistory(storageService.getHistory())
      }}
    >
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error('useMood must be used within a MoodProvider');
  return ctx;
}
