import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { MoodProvider } from './context/MoodContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfileModal from './components/UserProfileModal';
import LumiChat from './components/LumiChat';

import LandingPage from './pages/LandingPage';
import AuthGateway from './pages/AuthGateway';
import CheckInPage from './pages/CheckInPage';
import WalletPage from './pages/WalletPage';
import AnalyticsPage from './pages/AnalyticsPage';
import BreathePage from './pages/BreathePage';
import CommunityPage from './pages/CommunityPage';

// Protected Route Guard: Redirects unauthenticated visitors to /login
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <MoodProvider>
          <div className="min-h-screen flex flex-col bg-sand-100 text-stone-800 dark:bg-darkbg-base dark:text-sand-100 transition-colors duration-300">
            {/* Sticky Navigation Header with Live Coins & Streak */}
            <Navbar />

            {/* Main Application Container */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
              <Routes>
                {/* Public Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* Authentication & Onboarding Gateway */}
                <Route path="/login" element={<AuthGateway />} />
                <Route path="/signup" element={<AuthGateway />} />

                {/* Protected Core Hub Pages */}
                <Route
                  path="/checkin"
                  element={
                    <ProtectedRoute>
                      <CheckInPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/app"
                  element={<Navigate to="/checkin" replace />}
                />

                {/* The Joyful Bar Graph & Biometrics */}
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <AnalyticsPage />
                    </ProtectedRoute>
                  }
                />

                {/* Lumi 🌿 — Emotional Companion */}
                <Route
                  path="/lumi"
                  element={
                    <ProtectedRoute>
                      <LumiChat />
                    </ProtectedRoute>
                  }
                />
                {/* Legacy route alias */}
                <Route
                  path="/mia"
                  element={<Navigate to="/lumi" replace />}
                />

                {/* Rewards Hub & Coin Ledger */}
                <Route
                  path="/wallet"
                  element={
                    <ProtectedRoute>
                      <WalletPage />
                    </ProtectedRoute>
                  }
                />

                {/* Zen Breathing Sanctuary */}
                <Route
                  path="/breathe"
                  element={
                    <ProtectedRoute>
                      <BreathePage />
                    </ProtectedRoute>
                  }
                />

                {/* Community Kindness Wall */}
                <Route
                  path="/community"
                  element={
                    <ProtectedRoute>
                      <CommunityPage />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Persistent Profile / Settings Modal */}
            <UserProfileModal />

            {/* Footer with Reset Canvas & Demo Profile Switch */}
            <Footer />
          </div>
        </MoodProvider>
      </WalletProvider>
    </AuthProvider>
  );
}
