import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import logo from '../assets/images/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="px-6 py-16 border-t border-gray-800 bg-[#101218]">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Copyright */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Zenic" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold bg-gradient-to-r from-brand-brown to-brand-yellow bg-clip-text text-transparent">
                ZENIC
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Copyright © 2025. All rights reserved.
            </p>
          </div>

          {/* Terms */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Terms</h3>
            <ul className="space-y-3">
              <li><a href="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/cookies" className="text-gray-400 text-sm hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Supports */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Supports</h3>
            <ul className="space-y-3">
              <li><a href="/feedback" className="text-gray-400 text-sm hover:text-white transition-colors">Feedback</a></li>
              <li><a href="/docs" className="text-gray-400 text-sm hover:text-white transition-colors">Docs</a></li>
            </ul>
          </div>

          {/* Engage */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Engage</h3>
            <ul className="space-y-3">
              <li><a href="https://discord.gg/zenic" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">Discord <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="https://twitter.com/zenic" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2">Twitter X <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 