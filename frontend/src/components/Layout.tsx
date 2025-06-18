import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import { useAuth } from '../hooks/useAuth';
import { getUserProfile } from '../services/userService';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  showSearchBar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showSearchBar = true }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authLoading && currentUser) {
      // User is authenticated, check their profile status
      getUserProfile(currentUser.uid).then(profile => {
        if (!profile || !profile.profileCompleted) {
          // If profile doesn't exist or is not completed,
          // and we are not already on the profile setup page,
          // redirect to profile setup.
          if (location.pathname !== '/profile-setup' && location.pathname !== '/profile-edit') {
            navigate('/profile-setup', { replace: true });
          }
        } else if (profile.profileCompleted && (location.pathname === '/profile-setup' || location.pathname === '/auth')) {
          // If profile is completed and user tries to access /profile-setup or /auth, redirect to dashboard
          navigate('/dashboard', { replace: true });
        }
      }).catch(error => {
        console.error("Error fetching user profile in Layout:", error);
        // Optionally handle error, e.g., redirect to an error page or show a notification
      });
    } else if (!authLoading && !currentUser) {
      // User is not authenticated, and we are not on the auth page, redirect to auth page
      if (location.pathname !== '/auth') {
        // navigate('/auth', { replace: true }); // Commented out for now, as this might be too aggressive
                                              // depending on public routes. Re-evaluate if needed.
      }
    }
  }, [currentUser, authLoading, navigate, location.pathname]);

  // Detect if the current route is /search
  const isSearchPage = typeof window !== 'undefined' && window.location.pathname === '/search';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onCollapse={setIsSidebarCollapsed} />
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-8`}>
        {showSearchBar && !isSearchPage && (
          <div className="mb-8">
            <SearchBar />
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default Layout;