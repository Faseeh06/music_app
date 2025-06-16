import React, { useRef, useState } from 'react';
import { User, Upload, BarChart3, Award, Lock, Eye, Edit3 } from 'lucide-react';
import Layout from './Layout';

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
  const [avatar, setAvatar] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState(dummyPrivacy);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Layout showSearchBar={false}>
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
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-3xl font-bold text-brand-dark truncate">John Doe</h2>
              <button className="p-1 rounded-full hover:bg-gray-100 transition-colors" title="Edit Name">
                <Edit3 className="w-4 h-4 text-brand-brown" />
              </button>
            </div>
            <p className="text-gray-500 mb-2">@johnny_music</p>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="bg-brand-brown/10 text-brand-brown px-3 py-1 rounded-full text-sm font-medium">Level {dummyStats.level}</span>
              <span className="bg-brand-yellow/20 text-brand-dark px-3 py-1 rounded-full text-sm font-medium">{dummyStats.streak} Day Streak</span>
            </div>
          </div>
        </div>

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
    </Layout>
  );
};

export default ProfilePage; 