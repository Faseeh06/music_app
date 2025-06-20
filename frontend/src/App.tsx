import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import SearchPage from './components/SearchPage';
import PracticePage from './components/PracticePage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import HistoryPage from './pages/HistoryPage';
import RankingPage from './pages/RankingPage';
import PrivacyPage from './components/PrivacyPage';
import BlogPage from './components/BlogPage';
import FAQPage from './components/FAQPage';
import DocsPage from './components/DocsPage';
import './App.css';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return <Navigate to="/auth" replace />;
  
  return <>{children}</>;
};

// Auth Route component (redirect to dashboard if already logged in)
const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

function AppContent() {
  const { currentUser } = useAuth();
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-poppins">        <Routes>
          <Route 
            path="/auth" 
            element={<Navigate to="/signin" replace />} 
          />
          <Route 
            path="/signin" 
            element={
              <AuthRoute>
                <SignInPage />
              </AuthRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <AuthRoute>
                <SignUpPage />
              </AuthRoute>
            } 
          />
          <Route
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/practice/:songId"
            element={
              <ProtectedRoute>
                <PracticePage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/history" 
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ranking" 
            element={
              <ProtectedRoute>
                <RankingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/privacy" 
            element={<PrivacyPage />} 
          />
          <Route 
            path="/blog" 
            element={<BlogPage />} 
          />
          <Route 
            path="/faq" 
            element={<FAQPage />} 
          />
          <Route 
            path="/docs" 
            element={<DocsPage />} 
          />
          <Route 
            path="/" 
            element={
              currentUser ? <Navigate to="/dashboard" replace /> : <LandingPage />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;