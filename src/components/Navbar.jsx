import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Flame,
  Sun,
  Moon,
  Menu,
  X,
  Smile,
  BarChart3,
  Wallet,
  MessageSquareHeart,
  Wind,
  HeartHandshake,
  LogOut,
  LogIn,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';

export default function Navbar() {
  const { user, isAuthenticated, logout, openProfileModal, darkMode, toggleDarkMode } = useAuth();
  const { happyCoins, calmCoins, growthCoins } = useWallet();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/checkin', label: 'Check-In', icon: Smile },
    { to: '/analytics', label: 'Joyful Graph', icon: BarChart3 },
    { to: '/wallet', label: 'Rewards Hub', icon: Wallet },
    { to: '/lumi', label: 'Lumi 🌿', icon: MessageSquareHeart },
    { to: '/breathe', label: 'Sanctuary', icon: Wind },
    { to: '/community', label: 'Kindness Wall', icon: HeartHandshake }
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-sand-100/90 dark:bg-darkbg-base/90 border-b border-sand-300/60 dark:border-darkbg-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-sage-100 dark:bg-sage-950/70 border border-sage-300 dark:border-sage-800 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform duration-200">
            🌿
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-sand-50 tracking-tight text-lg">
              MoodMate
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-sage-100 dark:bg-sage-900/60 text-sage-700 dark:text-sage-300 border border-sage-200 dark:border-sage-800">
                Hub
              </span>
              {user?.isDemo && (
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-md bg-amber-200 text-amber-900 border border-amber-300">
                  Demo
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-700 dark:text-sand-400 font-medium hidden sm:block">
              Everyday Emotional Reset
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-sage-600 text-white shadow-xs dark:bg-sage-600'
                    : 'text-stone-600 dark:text-sand-300 hover:text-stone-900 dark:hover:text-white hover:bg-sand-200/70 dark:hover:bg-darkbg-card'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-stone-400 dark:text-sand-400'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side widgets: Coins, Streak, Theme, Profile, Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Coin Balances Pill */}
          <Link
            to="/wallet"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-sand-200/80 dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border hover:border-sage-400 dark:hover:border-sage-600 transition-colors shadow-xs"
            title="Your Calm, Happy, and Growth Coins"
          >
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
              <span>🟡</span>
              <span>{happyCoins}</span>
            </div>
            <div className="w-[1px] h-3 bg-stone-300 dark:bg-stone-700" />
            <div className="flex items-center gap-1 text-xs font-semibold text-sky-700 dark:text-sky-300">
              <span>🔵</span>
              <span>{calmCoins}</span>
            </div>
            <div className="w-[1px] h-3 bg-stone-300 dark:bg-stone-700 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-purple-700 dark:text-purple-300">
              <span>🟣</span>
              <span>{growthCoins}</span>
            </div>
          </Link>

          {/* Streak Counter */}
          {isAuthenticated && (
            <button
              onClick={openProfileModal}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-terracotta-50 dark:bg-terracotta-950/40 border border-terracotta-200 dark:border-terracotta-900/60 text-terracotta-700 dark:text-terracotta-300 text-xs font-bold shadow-xs hover:scale-105 transition-transform"
              title="Daily Active Streak"
            >
              <Flame className="w-3.5 h-3.5 text-terracotta-500 fill-terracotta-500 animate-pulse" />
              <span>{user?.streak || 0}d</span>
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-stone-600 dark:text-sand-300 hover:bg-sand-200/70 dark:hover:bg-darkbg-card border border-transparent hover:border-sand-300 dark:border-darkbg-border transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
          </button>

          {/* User Profile Avatar or Sign In button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={openProfileModal}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-white dark:bg-darkbg-card border border-sand-300 dark:border-darkbg-border hover:border-sage-400 shadow-xs transition-all"
                title="View Profile Settings"
              >
                <span className="text-lg leading-none">{user?.avatar || '🌱'}</span>
                <span className="text-xs font-semibold text-stone-700 dark:text-sand-200 hidden md:inline-block max-w-[80px] truncate">
                  {user?.name ? user.name.split(' ')[0] : 'Profile'}
                </span>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 transition-colors"
                title="Sign Out / Exit Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs shadow-soft transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 rounded-xl text-stone-600 dark:text-sand-300 hover:bg-sand-200/70 dark:hover:bg-darkbg-card"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sand-300 dark:border-darkbg-border bg-sand-100 dark:bg-darkbg-base px-4 pt-3 pb-5 space-y-1 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-sage-600 text-white font-semibold'
                    : 'text-stone-700 dark:text-sand-200 hover:bg-sand-200 dark:hover:bg-darkbg-card'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-stone-400'}`} />
                {link.label}
              </Link>
            );
          })}

          {isAuthenticated ? (
            <button
              onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out ({user?.name})</span>
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-sage-600 text-white"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In / Create Account</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
