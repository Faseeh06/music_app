import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

interface LayoutProps {
  children: React.ReactNode;
  showSearchBar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showSearchBar = true }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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