import React, { useRef, useState } from 'react';
import { User, Upload, BarChart3, Award, Lock, Eye, Edit3, MapPin, Calendar, Music, Guitar } from 'lucide-react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

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
  const [avatar, setAvatar] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState(dummyPrivacy);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  // Update avatar when profile loads
  React.useEffect(() => {
    if (profile) {
      setAvatar(profile.photoURL || currentUser?.photoURL || null);
    }
  }, [profile, currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-poppins">
        <Sidebar onCollapse={setSidebarCollapsed} />
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Navbar />
          <div className="max-w-3xl mx-auto py-10 px-4 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown mx-auto mb-4"></div>
              <p className="text-gray-600">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 font-poppins">
        <Sidebar onCollapse={setSidebarCollapsed} />
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Navbar />
          <div className="max-w-3xl mx-auto py-10 px-4 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-gray-600">Profile not found</p>
            </div>
          </div>
        </div>
      </div>
    );  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-3xl mx-auto py-10 px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col sm:flex-row items-center gap-8 mb-8">
          <div className="relative group">
            <img
              src={avatar || 'https://picsum.photos/200'}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-brand-brown shadow"
            />
            <button
              className="absolute bottom-2 right-2 bg-brand-brown text-white p-2 rounded-full shadow hover:bg-brand-dark transition-colors"
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
          </div>          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-3xl font-bold text-brand-dark truncate">
                {profile.displayName || profile.username || 'User'}
              </h2>              <button 
                className="p-1 rounded-full hover:bg-gray-100 transition-colors" 
                title="Edit Profile"
                onClick={() => navigate('/settings')}
              >
                <Edit3 className="w-4 h-4 text-brand-brown" />
              </button>
            </div>
            <p className="text-gray-500 mb-2">@{profile.username}</p>
            <p className="text-gray-600 mb-2">{currentUser?.email}</p>
            
            {profile.bio && (
              <p className="text-gray-700 mb-2">{profile.bio}</p>
            )}
            
            {profile.location && (
              <div className="flex items-center gap-1 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{profile.location}</span>
              </div>
            )}
            
            {profile.dateOfBirth && (
              <div className="flex items-center gap-1 text-gray-600 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Born {new Date(profile.dateOfBirth).toLocaleDateString()}</span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="bg-brand-brown/10 text-brand-brown px-3 py-1 rounded-full text-sm font-medium">
                {profile.skillLevel.charAt(0).toUpperCase() + profile.skillLevel.slice(1)}
              </span>
              <span className="bg-brand-yellow/20 text-brand-dark px-3 py-1 rounded-full text-sm font-medium">
                {dummyStats.streak} Day Streak
              </span>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Instruments */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
              <Guitar className="w-5 h-5" />
              Instruments
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.instruments.map((instrument) => (
                <span 
                  key={instrument}
                  className="bg-brand-brown/10 text-brand-brown px-3 py-1 rounded-full text-sm font-medium"
                >
                  {instrument}
                </span>
              ))}
            </div>
          </div>

          {/* Favorite Genres */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
              <Music className="w-5 h-5" />
              Favorite Genres
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.favoriteGenres.map((genre) => (
                <span 
                  key={genre}
                  className="bg-brand-yellow/20 text-brand-dark px-3 py-1 rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Goals Section */}
        {profile.goals && profile.goals.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h3 className="text-lg font-bold text-brand-dark mb-4">Musical Goals</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {profile.goals.map((goal) => (
                <div 
                  key={goal}
                  className="bg-gradient-to-r from-brand-brown/10 to-brand-yellow/10 border border-brand-brown/20 rounded-lg p-3 text-center"
                >
                  <span className="text-sm font-medium text-brand-dark">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <BarChart3 className="w-8 h-8 text-brand-brown mb-2" />
            <div className="text-2xl font-bold text-brand-dark">{dummyStats.totalPractice}h</div>
            <div className="text-gray-500">Total Practice</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <User className="w-8 h-8 text-brand-brown mb-2" />
            <div className="text-2xl font-bold text-brand-dark">{dummyStats.sessions}</div>
            <div className="text-gray-500">Sessions</div>
          </div>
        </div>

        {/* Progress Chart (dummy) */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-lg font-bold text-brand-dark mb-4">Practice Progress</h3>
          <div className="w-full h-32 flex items-end gap-2">
            {[40, 60, 80, 50, 90, 70, 100].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-6 rounded-t-lg bg-brand-brown" style={{ height: `${v}%` }}></div>
                <span className="text-xs text-gray-400 mt-1">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-lg font-bold text-brand-dark mb-4">Achievements</h3>
          <div className="flex flex-wrap gap-6">
            {dummyAchievements.map((ach, i) => (
              <div key={i} className="flex flex-col items-center bg-brand-yellow/10 rounded-lg p-4 min-w-[120px]">
                {ach.icon}
                <div className="font-semibold text-brand-dark mt-2">{ach.label}</div>
                <div className="text-xs text-gray-500 text-center mt-1">{ach.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Controls */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h3 className="text-lg font-bold text-brand-dark mb-4">Privacy Controls</h3>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.profileVisible}
                onChange={e => setPrivacy(p => ({ ...p, profileVisible: e.target.checked }))}
                className="accent-brand-brown w-5 h-5"
              />
              <span className="text-brand-dark font-medium">Profile Visible</span>
              <Eye className="w-5 h-5 text-gray-400" />
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.shareStats}
                onChange={e => setPrivacy(p => ({ ...p, shareStats: e.target.checked }))}
                className="accent-brand-brown w-5 h-5"
              />
              <span className="text-brand-dark font-medium">Share Practice Stats</span>
              <Lock className="w-5 h-5 text-gray-400" />
            </label>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 