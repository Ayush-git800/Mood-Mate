/**
 * Unified Multi-User Storage Service Layer for MoodMate
 *
 * Supports authentic multi-user sessions, guest accounts, and demo mode.
 * Storage keys:
 * - 'moodmate_users': array of registered accounts
 * - 'moodmate_active_user_id': active session id
 * - 'moodmate_data_<userId>': user-scoped history, wallet, streak, tasks
 * - 'moodmate_kindness_notes': communal wall notes
 * - 'moodmate_dark_mode': global UI preference
 * - 'moodmate_api_key': optional user Gemini / OpenRouter API key
 */

import {
  INITIAL_USER,
  INITIAL_WALLET,
  SEED_HISTORY,
  SEED_KINDNESS_NOTES,
  SHOP_ITEMS
} from '../data/seedData';

const STORAGE_KEYS = {
  USERS: 'moodmate_users',
  ACTIVE_USER_ID: 'moodmate_active_user_id',
  KINDNESS_NOTES: 'moodmate_kindness_notes',
  DARK_MODE: 'moodmate_dark_mode',
  API_CONFIG: 'moodmate_api_config'
};

function getUserDataKey(userId) {
  return `moodmate_data_${userId}`;
}

export const storageService = {
  // --- USER AUTHENTICATION & SESSIONS ---

  getUsers: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveUsers: (users) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  getActiveUserId: () => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_USER_ID) || null;
  },

  setActiveUserId: (userId) => {
    if (userId) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_USER_ID, userId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_ID);
    }
  },

  getActiveUser: () => {
    const activeId = storageService.getActiveUserId();
    if (!activeId) return null;
    const users = storageService.getUsers();
    const found = users.find(u => u.id === activeId);
    return found || null;
  },

  /**
   * Register a brand new user.
   * STARTS COMPLETELY FRESH: 0 days logged, empty graph, clean wallet!
   */
  registerUser: ({ name, college = '', avatar = '🌱', goal = 'Build emotional consistency', email, password }) => {
    const users = storageService.getUsers();
    const cleanEmail = (email || `user_${Date.now()}@moodmate.app`).toLowerCase().trim();

    // Check if email already exists
    const existing = users.find(u => u.email === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email already exists. Please sign in.' };
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      email: cleanEmail,
      password: password || 'demo123',
      name: name.trim() || 'Mindful Friend',
      college: college.trim() || 'Campus Seeker',
      avatar,
      goal: goal.trim() || 'Build emotional consistency',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      createdAt: Date.now()
    };

    // Save user in registry
    users.push(newUser);
    storageService.saveUsers(users);

    // Initialize clean user data partition
    const freshUserData = {
      history: [], // ZERO logs! Clean blank canvas!
      wallet: {
        happy: 0,
        calm: 10, // Small 10 Calm Coin welcome bonus
        growth: 0,
        transactions: [
          { id: 'tx-welcome', type: 'calm', amount: 10, reason: 'Welcome to MoodMate 🌱', timestamp: 'Just now' }
        ]
      },
      streak: 0,
      unlockedItems: ['theme-misty-pine'],
      tasksCompleted: {}, // { taskId: timestamp }
      activeTheme: 'theme-misty-pine'
    };

    localStorage.setItem(getUserDataKey(newUser.id), JSON.stringify(freshUserData));
    storageService.setActiveUserId(newUser.id);

    return { success: true, user: newUser };
  },

  /**
   * Authenticate existing user with email and password
   */
  loginUser: (email, password) => {
    const cleanEmail = email.toLowerCase().trim();
    const users = storageService.getUsers();
    const user = users.find(u => u.email === cleanEmail);

    if (!user) {
      return { success: false, message: 'No account found with this email. Try creating a fresh account.' };
    }
    if (password && user.password && user.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    storageService.setActiveUserId(user.id);
    return { success: true, user };
  },

  /**
   * One-click "Explore as Guest" with clean fresh canvas
   */
  loginAsGuest: () => {
    const guestId = 'guest_' + Date.now();
    const guestUser = {
      id: guestId,
      email: `${guestId}@guest.moodmate`,
      name: 'Kind Traveler',
      college: 'Guest Explorer',
      avatar: '🌱',
      goal: 'Experience daily mindful grounding',
      joinedDate: 'Today',
      isGuest: true
    };

    const users = storageService.getUsers();
    users.push(guestUser);
    storageService.saveUsers(users);

    const freshUserData = {
      history: [], // Blank canvas
      wallet: {
        happy: 0,
        calm: 10,
        growth: 0,
        transactions: [{ id: 'tx-g', type: 'calm', amount: 10, reason: 'Guest Explorer Welcome', timestamp: 'Just now' }]
      },
      streak: 0,
      unlockedItems: ['theme-misty-pine'],
      tasksCompleted: {},
      activeTheme: 'theme-misty-pine'
    };

    localStorage.setItem(getUserDataKey(guestId), JSON.stringify(freshUserData));
    storageService.setActiveUserId(guestId);

    return { success: true, user: guestUser };
  },

  /**
   * Load Demo Profile (Pre-seeded with 14 days, 160 coins, 5-day streak)
   * Specifically for Hackathon Judges & Live Demonstrations
   */
  loadDemoProfile: () => {
    const demoUser = {
      ...INITIAL_USER,
      isDemo: true
    };

    // Ensure demo user is in users list
    const users = storageService.getUsers().filter(u => u.id !== demoUser.id);
    users.unshift(demoUser);
    storageService.saveUsers(users);

    // Save rich 14-day history and wallet for demo user
    const demoData = {
      history: SEED_HISTORY,
      wallet: INITIAL_WALLET,
      streak: 5,
      unlockedItems: ['theme-misty-pine', 'sound-lofi-forest', 'badge-kindness-ambassador'],
      tasksCompleted: {},
      activeTheme: 'theme-misty-pine'
    };

    localStorage.setItem(getUserDataKey(demoUser.id), JSON.stringify(demoData));
    storageService.setActiveUserId(demoUser.id);

    return demoUser;
  },

  logout: () => {
    storageService.setActiveUserId(null);
  },

  // --- USER DATA PARTITION HELPERS ---

  getCurrentUserData: () => {
    const activeId = storageService.getActiveUserId();
    if (!activeId) return null;
    try {
      const data = localStorage.getItem(getUserDataKey(activeId));
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveCurrentUserData: (userData) => {
    const activeId = storageService.getActiveUserId();
    if (!activeId) return;
    localStorage.setItem(getUserDataKey(activeId), JSON.stringify(userData));
  },

  // --- USER PROFILE UPDATES ---
  updateUserProfile: (updates) => {
    const activeId = storageService.getActiveUserId();
    if (!activeId) return null;
    const users = storageService.getUsers();
    const idx = users.findIndex(u => u.id === activeId);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      storageService.saveUsers(users);
      return users[idx];
    }
    return null;
  },

  // --- MOOD HISTORY ---
  getHistory: () => {
    const data = storageService.getCurrentUserData();
    return data?.history || [];
  },

  addMoodEntry: (entry) => {
    const data = storageService.getCurrentUserData();
    if (!data) return [];
    const updatedHistory = [entry, ...(data.history || [])];
    const newStreak = (data.streak || 0) + 1;
    const updated = {
      ...data,
      history: updatedHistory,
      streak: newStreak
    };
    storageService.saveCurrentUserData(updated);
    return updatedHistory;
  },

  // --- WALLET & COIN TRANSACTIONS ---
  getWallet: () => {
    const data = storageService.getCurrentUserData();
    return data?.wallet || { happy: 0, calm: 0, growth: 0, transactions: [] };
  },

  saveWallet: (wallet) => {
    const data = storageService.getCurrentUserData();
    if (!data) return;
    storageService.saveCurrentUserData({ ...data, wallet });
  },

  // --- UNLOCKED SHOP REWARDS ---
  getUnlockedItems: () => {
    const data = storageService.getCurrentUserData();
    return data?.unlockedItems || ['theme-misty-pine'];
  },

  saveUnlockedItems: (items) => {
    const data = storageService.getCurrentUserData();
    if (!data) return;
    storageService.saveCurrentUserData({ ...data, unlockedItems: items });
  },

  // --- COMPLETED TASKS ---
  getCompletedTasks: () => {
    const data = storageService.getCurrentUserData();
    return data?.tasksCompleted || {};
  },

  markTaskComplete: (taskId) => {
    const data = storageService.getCurrentUserData();
    if (!data) return {};
    const updatedTasks = { ...(data.tasksCompleted || {}), [taskId]: Date.now() };
    storageService.saveCurrentUserData({ ...data, tasksCompleted: updatedTasks });
    return updatedTasks;
  },

  // --- ACTIVE THEME ---
  getActiveTheme: () => {
    const data = storageService.getCurrentUserData();
    return data?.activeTheme || 'theme-misty-pine';
  },

  setActiveTheme: (themeId) => {
    const data = storageService.getCurrentUserData();
    if (!data) return;
    storageService.saveCurrentUserData({ ...data, activeTheme: themeId });
  },

  // --- KINDNESS WALL NOTES (COMMUNAL) ---
  getKindnessNotes: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.KINDNESS_NOTES);
      return data ? JSON.parse(data) : SEED_KINDNESS_NOTES;
    } catch (e) {
      return SEED_KINDNESS_NOTES;
    }
  },

  saveKindnessNotes: (notes) => {
    localStorage.setItem(STORAGE_KEYS.KINDNESS_NOTES, JSON.stringify(notes));
  },

  // --- DARK MODE ---
  getDarkMode: () => {
    const val = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return val !== null ? JSON.parse(val) : false;
  },

  setDarkMode: (isDark) => {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(isDark));
  },

  // --- API BRIDGE CONFIG (GEMINI / OPENAI) ---
  getApiConfig: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.API_CONFIG);
      return data ? JSON.parse(data) : { useLiveApi: false, apiKey: '', provider: 'gemini' };
    } catch (e) {
      return { useLiveApi: false, apiKey: '', provider: 'gemini' };
    }
  },

  saveApiConfig: (config) => {
    localStorage.setItem(STORAGE_KEYS.API_CONFIG, JSON.stringify(config));
  }
};
