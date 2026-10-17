import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../utils/storage';
import { playCoinSound, playSingingBowlTone } from '../utils/sound';
import { useAuth } from './AuthContext';

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const { user } = useAuth();
  const [wallet, setWallet] = useState(() => storageService.getWallet());
  const [unlockedItems, setUnlockedItems] = useState(() => storageService.getUnlockedItems());
  const [completedTasks, setCompletedTasks] = useState(() => storageService.getCompletedTasks());
  const [activeTheme, setActiveThemeState] = useState(() => storageService.getActiveTheme());
  const [activeSound, setActiveSoundState] = useState(null);

  // Sync wallet when active user changes (e.g. login, signup, load demo)
  useEffect(() => {
    setWallet(storageService.getWallet());
    setUnlockedItems(storageService.getUnlockedItems());
    setCompletedTasks(storageService.getCompletedTasks());
    setActiveThemeState(storageService.getActiveTheme());
  }, [user?.id]);

  /**
   * Add coins to a specific wallet pool with an audit transaction entry
   * @param {'happy'|'calm'|'growth'} type
   * @param {number} amount
   * @param {string} reason
   */
  const addCoins = (type, amount, reason) => {
    playCoinSound();
    setWallet(prev => {
      const currentVal = prev[type] || 0;
      const newBalance = currentVal + amount;
      const newTransaction = {
        id: 'tx-' + Date.now(),
        type,
        amount,
        reason,
        timestamp: 'Just now'
      };
      const updated = {
        ...prev,
        [type]: newBalance,
        transactions: [newTransaction, ...(prev.transactions || []).slice(0, 30)]
      };
      storageService.saveWallet(updated);
      return updated;
    });
  };

  /**
   * Complete a mood-specific micro task (+15 Growth Coins)
   */
  const completeMicroTask = (taskId, taskTitle) => {
    if (completedTasks[taskId]) return false;
    const updated = storageService.markTaskComplete(taskId);
    setCompletedTasks(updated);
    addCoins('growth', 15, `Completed: ${taskTitle}`);
    return true;
  };

  /**
   * Spend coins for rewards shop unlock
   * @param {{ type: 'happy'|'calm'|'growth', amount: number }} cost
   * @param {string} itemId
   * @param {string} itemName
   */
  const unlockItem = (cost, itemId, itemName) => {
    const currentBalance = wallet[cost.type] || 0;
    if (currentBalance < cost.amount) {
      return { success: false, message: `Not enough ${cost.type} coins. Need ${cost.amount}, you have ${currentBalance}.` };
    }

    playSingingBowlTone();
    // Deduct coins
    setWallet(prev => {
      const newBalance = prev[cost.type] - cost.amount;
      const newTransaction = {
        id: 'tx-' + Date.now(),
        type: cost.type,
        amount: -cost.amount,
        reason: `Unlocked ${itemName}`,
        timestamp: 'Just now'
      };
      const updated = {
        ...prev,
        [cost.type]: newBalance,
        transactions: [newTransaction, ...(prev.transactions || []).slice(0, 30)]
      };
      storageService.saveWallet(updated);
      return updated;
    });

    // Mark item unlocked
    setUnlockedItems(prev => {
      if (prev.includes(itemId)) return prev;
      const updated = [...prev, itemId];
      storageService.saveUnlockedItems(updated);
      return updated;
    });

    return { success: true, message: `Successfully unlocked ${itemName}!` };
  };

  const selectTheme = (themeId) => {
    setActiveThemeState(themeId);
    storageService.setActiveTheme(themeId);
  };

  const refreshWallet = () => {
    setWallet(storageService.getWallet());
    setUnlockedItems(storageService.getUnlockedItems());
    setCompletedTasks(storageService.getCompletedTasks());
    setActiveThemeState(storageService.getActiveTheme());
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        happyCoins: wallet.happy || 0,
        calmCoins: wallet.calm || 0,
        growthCoins: wallet.growth || 0,
        transactions: wallet.transactions || [],
        unlockedItems,
        completedTasks,
        completeMicroTask,
        unlockItem,
        addCoins,
        activeTheme,
        selectTheme,
        activeSound,
        setActiveSound: setActiveSoundState,
        refreshWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within a WalletProvider');
  return ctx;
}
