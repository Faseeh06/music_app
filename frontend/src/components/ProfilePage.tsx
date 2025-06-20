import React, { useRef, useState } from 'react';
import { User, Upload, BarChart3, Award, Lock, Eye, Edit3, MapPin, Calendar, Music, Guitar } from 'lucide-react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';

const dummyStats = {
  totalPractice: 142,
  sessions: 52,
  streak: 12,
  level: 8,
  xp: 2450,
  nextLevelXp: 3000,
};

const dummyAchievements = [
  { icon: <Award className="w-7 h-7 text-yellow-400" />, label: '7 Day Streak', desc: 'Practiced 7 days in a row' },
  { icon: <Award className="w-7 h-7 text-brand-brown" />, label: 'Level 5', desc: 'Reached Level 5' },
  { icon: <Award className="w-7 h-7 text-blue-400" />, label: 'First Practice', desc: 'Completed your first session' },
];

const dummyPrivacy = {
  profileVisible: true,
  shareStats: false,
};

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { profile, loading } = useUserProfile();
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState(dummyPrivacy);
  const fileInput = useRef<HTMLInputElement>(null);
  
  // Update avatar when profile loads
  React.useEffect(() => {
    if (profile) {
      setAvatar(profile.photoURL || currentUser?.photoURL || null);
    }
  }, [profile, currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
        <Sidebar />
        <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Navbar />
          <div className="max-w-7xl mx-auto py-10 px-4 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown mx-auto mb-4"></div>
              <p className="text-gray-400">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
        <Sidebar />
        <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Navbar />
          <div className="max-w-7xl mx-auto py-10 px-4 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-gray-400">Profile not found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
      <Sidebar />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
          
          {/* Profile Header */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8 mb-8 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
            <div className="relative group">
              <img
                src={avatar || 'https://picsum.photos/200'}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-brand-brown shadow-lg"
              />
              <button
                className="absolute bottom-2 right-2 bg-brand-brown text-white p-2 rounded-full shadow-lg hover:bg-brand-brown/80 transition-colors"
                onClick={() => fileInput.current?.click()}
                title="Change Avatar"
              >
                <Upload className="w-5 h-5" />
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInput}
                onChange={handleAvatarChange}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-3xl font-bold text-white truncate">
                  {profile.displayName || profile.username || 'User'}
                </h2>
                <button 
                  className="p-1 rounded-full hover:bg-gray-700/50 transition-colors" 
                  title="Edit Profile"
                  onClick={() => navigate('/settings')}
                >
                  <Edit3 className="w-4 h-4 text-brand-brown" />
                </button>
              </div>
              <p className="text-gray-400 mb-2">@{profile.username}</p>
              <p className="text-gray-300 mb-2">{currentUser?.email}</p>
              
              {profile.bio && (
                <p className="text-gray-300 mb-2">{profile.bio}</p>
              )}
              
              {profile.location && (
                <div className="flex items-center gap-1 text-gray-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{profile.location}</span>
                </div>
              )}
              
              {profile.dateOfBirth && (
                <div className="flex items-center gap-1 text-gray-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Born {new Date(profile.dateOfBirth).toLocaleDateString()}</span>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 mt-2">
                <span className="bg-brand-brown/20 text-brand-brown px-3 py-1 rounded-full text-sm font-medium border border-brand-brown/30">
                  {profile.skillLevel.charAt(0).toUpperCase() + profile.skillLevel.slice(1)}
                </span>
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium border border-yellow-500/30">
                  {dummyStats.streak} Day Streak
                </span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">{dummyStats.totalPractice}h</div>
              <div className="text-gray-400 text-sm">Total Practice</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">{dummyStats.sessions}</div>
              <div className="text-gray-400 text-sm">Sessions</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">{dummyStats.level}</div>
              <div className="text-gray-400 text-sm">Level</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1">{dummyStats.xp}</div>
              <div className="text-gray-400 text-sm">XP Points</div>
            </div>
          </div>

          {/* User Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Instruments */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Guitar className="w-5 h-5 text-brand-brown" />
                Instruments
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.instruments.map((instrument) => (
                  <span 
                    key={instrument}
                    className="bg-brand-brown/20 text-brand-brown px-3 py-1 rounded-full text-sm font-medium border border-brand-brown/30"
                  >
                    {instrument}
                  </span>
                ))}
              </div>
            </div>

            {/* Favorite Genres */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-brand-brown" />
                Favorite Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.favoriteGenres.map((genre) => (
                  <span 
                    key={genre}
                    className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Goals Section */}
          {profile.goals && profile.goals.length > 0 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-4">Musical Goals</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {profile.goals.map((goal) => (
                  <div key={goal} className="bg-blue-500/20 text-blue-400 px-3 py-2 rounded-lg text-sm font-medium border border-blue-500/30 text-center">
                    {goal}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Section */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dummyAchievements.map((achievement, index) => (
                <div key={index} className="bg-gray-700/30 p-4 rounded-lg text-center border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-300">
                  <div className="mb-2">{achievement.icon}</div>
                  <div className="font-medium text-white text-sm">{achievement.label}</div>
                  <div className="text-xs text-gray-400">{achievement.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:bg-gray-800/40 transition-all duration-300">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-brown" />
              Level Progress
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Level {dummyStats.level}</span>
              <span className="text-gray-400 text-sm">{dummyStats.xp} / {dummyStats.nextLevelXp} XP</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-brand-brown to-yellow-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(dummyStats.xp / dummyStats.nextLevelXp) * 100}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              {dummyStats.nextLevelXp - dummyStats.xp} XP to next level
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 