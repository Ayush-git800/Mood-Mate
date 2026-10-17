import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../utils/storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storageService.getActiveUser());
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => storageService.getDarkMode());

  // Apply dark mode class to <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    storageService.setDarkMode(darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const login = (email, password) => {
    const res = storageService.loginUser(email, password);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const register = (profileData) => {
    const res = storageService.registerUser(profileData);
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const loginGuest = () => {
    const res = storageService.loginAsGuest();
    if (res.success) {
      setUser(res.user);
    }
    return res;
  };

  const loadDemo = () => {
    const demoUser = storageService.loadDemoProfile();
    setUser(demoUser);
    return demoUser;
  };

  const logout = () => {
    storageService.logout();
    setUser(null);
  };

  const updateUser = (updates) => {
    const updated = storageService.updateUserProfile(updates);
    if (updated) {
      setUser(updated);
    }
  };

  const incrementStreak = () => {
    if (!user) return;
    const currentData = storageService.getCurrentUserData();
    if (currentData) {
      const newStreak = (currentData.streak || 0) + 1;
      storageService.saveCurrentUserData({ ...currentData, streak: newStreak });
      setUser(prev => ({ ...prev, streak: newStreak }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        loginGuest,
        loadDemo,
        logout,
        updateUser,
        incrementStreak,
        isProfileModalOpen,
        openProfileModal: () => setIsProfileModalOpen(true),
        closeProfileModal: () => setIsProfileModalOpen(false),
        darkMode,
        toggleDarkMode,
        refreshUser: () => setUser(storageService.getActiveUser())
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
