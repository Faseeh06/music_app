import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  LayoutDashboard,
  Search,
  History,
  Trophy,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import logo from '../assets/images/logo.png';

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, to: '/dashboard' },
  { label: 'Search', icon: <Search className="w-5 h-5" />, to: '/search' },
  { label: 'History', icon: <History className="w-5 h-5" />, to: '/history' },
  { label: 'Ranking', icon: <Trophy className="w-5 h-5" />, to: '/ranking' },
];

interface SidebarProps {
  onCollapse?: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapse?.(newState);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside
      className={`h-[97%] bg-black text-white flex flex-col justify-between fixed z-40 shadow-lg rounded-3xl transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      style={{ left: '0.6%', top: '0.6%', bottom: '0.6%' }}
    >
      <div>
        <div className={`flex items-center justify-center h-20 border-b border-gray-800 ${isCollapsed ? 'px-2' : 'px-4'}`}>
          {!isCollapsed && (
            <span className="font-extrabold text-2xl tracking-wide flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
              Zenic
            </span>
          )}
          {isCollapsed && (
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          )}
        </div>
        <nav className="mt-6 flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-150 hover:bg-brand-brown/80 hover:text-white ${
                location.pathname === item.to ? 'bg-brand-brown text-white' : 'text-gray-200'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              {item.icon}
              {!isCollapsed && item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mb-6 px-4 flex flex-col gap-2">
        <Link
          to="/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-150 hover:bg-brand-brown/80 hover:text-white ${
            location.pathname === '/profile' ? 'bg-brand-brown text-white' : 'text-gray-200'
          }`}
          title={isCollapsed ? 'Profile' : ''}
        >
          <User className="w-5 h-5" />
          {!isCollapsed && 'Profile'}
        </Link>
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-150 hover:bg-brand-brown/80 hover:text-white ${
            location.pathname === '/settings' ? 'bg-brand-brown text-white' : 'text-gray-200'
          }`}
          title={isCollapsed ? 'Settings' : ''}
        >
          <Settings className="w-5 h-5" />
          {!isCollapsed && 'Settings'}
        </Link>        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-150 hover:bg-red-600/90 hover:text-white text-gray-200 bg-transparent border-none outline-none"
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && 'Logout'}
        </button>
      </div>
      <button
        onClick={handleCollapse}
        className="absolute -right-3 top-8 bg-brand-brown text-white p-1 rounded-full hover:bg-brand-brown/80 transition-colors"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
};

export default Sidebar; 