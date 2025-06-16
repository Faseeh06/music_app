import React, { useState } from 'react';
import { Music, Headphones, Play, Volume2 } from 'lucide-react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

interface AuthPageProps {
  onLogin?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleAuth = () => {
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://i.pinimg.com/736x/79/9d/f3/799df3bbb2b6914fcc4c7703352c6314.jpg)'
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-brown/80 via-brand-dark/70 to-brand-brown/90"></div>
        
        {/* Floating Music Elements */}
        <div className="absolute top-20 left-10 animate-bounce delay-100">
          <Music className="text-brand-yellow/60 w-8 h-8" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce delay-300">
          <Headphones className="text-brand-yellow/60 w-10 h-10" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-500">
          <Play className="text-brand-yellow/60 w-6 h-6" />
        </div>
        <div className="absolute bottom-20 right-10 animate-bounce delay-700">
          <Volume2 className="text-brand-yellow/60 w-8 h-8" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-brand-yellow/20 backdrop-blur-sm rounded-full p-3 mr-4 border border-brand-yellow/30">
                <Music className="w-8 h-8 text-brand-yellow" />
              </div>
              <h1 className="text-2xl font-bold text-brand-light">Music Practice</h1>
            </div>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-6 leading-tight text-brand-light">
              Master Your Music
              <span className="block text-brand-yellow">Journey</span>
            </h2>
            <p className="text-xl text-brand-light/90 mb-8 leading-relaxed">
              Join thousands of musicians who are perfecting their craft with our innovative practice tools and personalized learning experience.
            </p>
            
            <div className="flex items-center space-x-6 text-brand-light/80">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-yellow rounded-full mr-2"></div>
                <span>Interactive Lessons</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-brand-yellow rounded-full mr-2"></div>
                <span>Progress Tracking</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/50 to-transparent"></div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-brand-light">
        <div className="w-full max-w-lg">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="bg-gradient-brand rounded-full p-3 mr-3">
              <Music className="w-6 h-6 text-brand-yellow" />
            </div>
            <h1 className="text-2xl font-bold text-brand-dark">Music Practice</h1>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                isSignUp
                  ? 'bg-white text-brand-brown shadow-sm'
                  : 'text-gray-600 hover:text-brand-brown'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                !isSignUp
                  ? 'bg-white text-brand-brown shadow-sm'
                  : 'text-gray-600 hover:text-brand-brown'
              }`}
            >
              Sign In
            </button>
          </div>

          {/* Form Container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: isSignUp ? 'translateX(0%)' : 'translateX(-100%)' }}
            >
              <div className="w-full flex-shrink-0">
                <SignUpForm onSignUp={handleAuth} />
              </div>
              <div className="w-full flex-shrink-0">
                <SignInForm onSignIn={handleAuth} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;