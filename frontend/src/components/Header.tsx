import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="relative z-50 px-6 py-4">
      <div className="w-full flex items-center">
        {/* Logo - Left Corner */}
        <div className="flex-shrink-0">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img src={logo} alt="Zenic" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-brown to-brand-yellow bg-clip-text text-transparent">
              ZENIC
            </span>
          </button>
        </div>
        
        {/* Center Navigation Links */}
        <div className="flex-1 flex items-center justify-center">          <div className="hidden md:flex items-center gap-12">
            <a href="/privacy" className="text-gray-300 hover:text-white transition-colors font-medium">
              プライバシーポリシー
            </a>
            <a href="/blog" className="text-gray-300 hover:text-white transition-colors font-medium">
              ブログ
            </a>
            <a href="/faq" className="text-gray-300 hover:text-white transition-colors font-medium">
              よくある質問
            </a>
            <a href="/docs" className="text-gray-300 hover:text-white transition-colors font-medium">
              ドキュメント
            </a>
          </div>
        </div>
        
        {/* Buttons - Right Corner */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <button 
            onClick={() => navigate('/signin')}
            className="relative px-4 py-2 text-white font-medium rounded-md border-2 border-gray-600/50 bg-gray-900/20 backdrop-blur-sm hover:border-brand-brown/70 hover:bg-brand-brown/10 hover:text-brand-yellow transition-all duration-300 group overflow-hidden"
          >
            <span className="relative z-10">サインイン</span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/0 via-brand-brown/5 to-brand-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="relative px-4 py-2 bg-gradient-to-r from-brand-brown to-brand-brown/90 text-white font-semibold rounded-md border-2 border-brand-brown/60 hover:from-brand-brown/90 hover:to-brand-yellow/80 hover:border-brand-yellow/70 transition-all duration-300 shadow-lg hover:shadow-brand-brown/30 transform hover:scale-105 overflow-hidden group"
          >
            <span className="relative z-10">始める</span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/0 via-brand-yellow/20 to-brand-yellow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header; 