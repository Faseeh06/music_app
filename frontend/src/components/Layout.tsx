import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import MusicPlayerBar from './MusicBar';
import { useMusicPlayer } from '../contexts/PlayerContext';

interface LayoutProps {
  children: React.ReactNode;
  showSearchBar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showSearchBar = true }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { currentTrack } = useMusicPlayer();

  const isSearchPage = typeof window !== 'undefined' && window.location.pathname === '/search';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onCollapse={setIsSidebarCollapsed} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <main className={`flex-1 p-8 ${currentTrack ? 'pb-28' : ''}`}>
          {showSearchBar && isSearchPage && (
            <div className="mb-8">
              <SearchBar />
            </div>
          )}
          {children}
        </main>
      </div>
      <MusicPlayerBar />
    </div>
  );
};

export default Layout;