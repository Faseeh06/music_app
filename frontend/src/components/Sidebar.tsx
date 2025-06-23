import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSidebar } from '../contexts/SidebarContext';
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

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside
      className={`h-[97%] bg-black text-white flex flex-col justify-between fixed z-40 shadow-2xl rounded-3xl transition-all duration-500 ease-in-out transform ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
      style={{ left: '0.6%', top: '0.6%', bottom: '0.6%' }}
    >
      <div>
        <div className={`flex items-center justify-center h-20 border-b border-gray-800 transition-all duration-500 ease-in-out ${isCollapsed ? 'px-2' : 'px-4'}`}>
          <div className="relative overflow-hidden w-full flex items-center justify-center">
            <div className={`transition-all duration-500 ease-in-out ${isCollapsed ? 'opacity-0 scale-75 -translate-x-4 pointer-events-none' : 'opacity-100 scale-100 translate-x-0'}`}>
              <span className="font-extrabold text-2xl tracking-wide flex items-center gap-2 whitespace-nowrap">
                <img src={logo} alt="Logo" className="w-10 h-10 object-contain transition-transform duration-300 hover:scale-110" />
              Zenic
            </span>
            </div>
            <div className={`absolute transition-all duration-500 ease-in-out ${isCollapsed ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-75 translate-x-4 pointer-events-none'}`}>
              <img src={logo} alt="Logo" className="w-10 h-10 object-contain transition-transform duration-300 hover:scale-110" />
            </div>
          </div>
        </div>
        <nav className="mt-6 flex flex-col gap-1 px-4">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out hover:bg-brand-brown/80 hover:text-white hover:shadow-lg hover:scale-105 transform ${
                location.pathname === item.to ? 'bg-brand-brown text-white shadow-lg scale-105' : 'text-gray-200 hover:translate-x-1'
              }`}
              title={isCollapsed ? item.label : ''}
              style={{
                transitionDelay: isCollapsed ? '0ms' : `${index * 50}ms`
              }}
            >
              <div className="transition-transform duration-200 hover:scale-110">
              {item.icon}
              </div>
              <span className={`transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap ${
                isCollapsed ? 'opacity-0 w-0 translate-x-4' : 'opacity-100 w-auto translate-x-0'
              }`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mb-6 px-4 flex flex-col gap-2">
        <Link
          to="/profile"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out hover:bg-brand-brown/80 hover:text-white hover:shadow-lg hover:scale-105 transform ${
            location.pathname === '/profile' ? 'bg-brand-brown text-white shadow-lg scale-105' : 'text-gray-200 hover:translate-x-1'
          }`}
          title={isCollapsed ? 'Profile' : ''}
        >
          <div className="transition-transform duration-200 hover:scale-110">
          <User className="w-5 h-5" />
          </div>
          <span className={`transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap ${
            isCollapsed ? 'opacity-0 w-0 translate-x-4' : 'opacity-100 w-auto translate-x-0'
          }`}>
            Profile
          </span>
        </Link>
        <Link
          to="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out hover:bg-brand-brown/80 hover:text-white hover:shadow-lg hover:scale-105 transform ${
            location.pathname === '/settings' ? 'bg-brand-brown text-white shadow-lg scale-105' : 'text-gray-200 hover:translate-x-1'
          }`}
          title={isCollapsed ? 'Settings' : ''}
        >
          <div className="transition-transform duration-200 hover:scale-110">
          <Settings className="w-5 h-5" />
          </div>
          <span className={`transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap ${
            isCollapsed ? 'opacity-0 w-0 translate-x-4' : 'opacity-100 w-auto translate-x-0'
          }`}>
            Settings
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out hover:bg-red-600/90 hover:text-white hover:shadow-lg hover:scale-105 transform text-gray-200 bg-transparent border-none outline-none hover:translate-x-1"
          title={isCollapsed ? 'Logout' : ''}
        >
          <div className="transition-transform duration-200 hover:scale-110">
          <LogOut className="w-5 h-5" />
          </div>
          <span className={`transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap ${
            isCollapsed ? 'opacity-0 w-0 translate-x-4' : 'opacity-100 w-auto translate-x-0'
          }`}>
            Logout
          </span>
        </button>
      </div>
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-8 bg-brand-brown text-white p-1 rounded-full hover:bg-brand-yellow transition-all duration-300 ease-in-out hover:scale-110 transform hover:shadow-lg"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <div className={`transition-transform duration-300 ease-in-out ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}>
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
        </div>
      </button>
    </aside>
  );
};

export default Sidebar; 