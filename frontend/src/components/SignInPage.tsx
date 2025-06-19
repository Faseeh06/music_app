import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Sparkles, TrendingUp, ArrowLeft } from 'lucide-react';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#101218] text-white relative overflow-hidden flex items-center justify-center">
      {/* Simple Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-brand-brown/15 via-brand-brown/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-brand-yellow/8 via-brand-yellow/2 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-radial from-brand-brown/10 via-brand-brown/3 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors z-20 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Main Content */}
      <div className="w-full max-w-5xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Context */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-3">
                  <img 
                    src="/src/assets/images/logo.png" 
                    alt="Zenic Logo" 
                    className="w-16 h-16"
                  />
                  <h1 className="text-3xl font-bold text-white ml-0.5">
                    ZENIC
                  </h1>
                </div>
                <p className="text-white font-light text-lg">
                  Sign in or create an account
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-gray-900/20 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-gray-400">Welcome back to your practice</p>
              </div>

              {/* Email/Password Form */}
              <div className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 bg-gray-800/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown/50 transition-all"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 bg-gray-800/30 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown/50 transition-all"
                  />
                </div>
                
                {/* Forgot Password */}
                <div className="text-right">
                  <button className="text-sm text-gray-400 hover:text-brand-brown transition-colors">
                    Forgot password?
                  </button>
                </div>

                <button className="w-full bg-gradient-to-r from-brand-brown to-brand-yellow text-white font-semibold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity">
                  Sign In
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-700"></div>
                <span className="px-4 text-sm text-gray-500">or</span>
                <div className="flex-1 h-px bg-gray-700"></div>
              </div>

              {/* Google Sign In */}
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-800 font-medium rounded-xl hover:bg-gray-50 transition-colors mb-6 group">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  New to Zenic?{' '}
                  <button
                    onClick={() => navigate('/signup')}
                    className="text-brand-brown hover:text-brand-yellow font-medium transition-colors"
                  >
                    Create account
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage; 