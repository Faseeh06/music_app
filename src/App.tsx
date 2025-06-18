import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import SearchPage from './components/SearchPage';
import PracticePage from './components/PracticePage';
import ProfilePage from './components/ProfilePage';
import HistoryPage from './pages/HistoryPage';
import RankingPage from './pages/RankingPage';
import './App.css';

function App() {
  // Mock authentication state - in real app this would come from context/state management
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-poppins">
        <Routes>
          <Route 
            path="/auth" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <AuthPage onLogin={() => setIsAuthenticated(true)} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard /> : 
              <Navigate to="/auth" replace />
            } 
          />
          <Route 
            path="/search" 
            element={
              isAuthenticated ? 
              <SearchPage /> : 
              <Navigate to="/auth" replace />
            } 
          />
          <Route
            path="/practice/:songId"
            element={
              isAuthenticated ?
              <PracticePage /> :
              <Navigate to="/auth" />
            }
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? 
              <ProfilePage /> : 
              <Navigate to="/auth" replace />
            } 
          />
          <Route 
            path="/history" 
            element={
              isAuthenticated ? 
              <HistoryPage /> : 
              <Navigate to="/auth" replace />
            } 
          />
          <Route 
            path="/ranking" 
            element={
              isAuthenticated ? 
              <RankingPage /> : 
              <Navigate to="/auth" replace />
            } 
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;