import React, { useState } from 'react';
import { User, Shield, Bell, Save, Edit3 } from 'lucide-react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAuth } from '../hooks/useAuth';
import { useSidebar } from '../contexts/SidebarContext';

type TabType = 'profile' | 'privacy' | 'notifications';

const SettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { profile, updateProfile, loading } = useUserProfile();
  const { isCollapsed } = useSidebar();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    bio: '',
    location: '',
    dateOfBirth: '',
    skillLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    instruments: [] as string[],
    favoriteGenres: [] as string[],
    goals: [] as string[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || '',
        username: profile.username || '',
        bio: profile.bio || '',
        location: profile.location || '',
        dateOfBirth: profile.dateOfBirth || '',
        skillLevel: profile.skillLevel || 'beginner',
        instruments: profile.instruments || [],
        favoriteGenres: profile.favoriteGenres || [],
        goals: profile.goals || []
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  const handleArrayChange = (field: 'instruments' | 'favoriteGenres' | 'goals', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: toggleArrayItem(prev[field], value)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.displayName.trim()) {
      newErrors.displayName = '表示名は必須です';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'ユーザー名は必須です';
    } else if (formData.username.length < 3) {
      newErrors.username = 'ユーザー名は3文字以上である必要があります';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ submit: 'プロフィールの更新に失敗しました。もう一度お試しください。' });
    } finally {
      setIsSubmitting(false);
    }
  };
  const instrumentOptions = ['ギター', 'ピアノ', 'ドラム', 'ベース', 'バイオリン', 'サクソフォン', 'トランペット', 'フルート'];
  const genreOptions = ['ロック', 'ポップ', 'ジャズ', 'ブルース', 'カントリー', 'クラシック', 'エレクトロニック', 'ヒップホップ', 'R&B', 'フォーク'];
  const goalOptions = ['楽曲を学ぶ', 'テクニックを向上', '作曲する', '他者と演奏', 'ライブ演奏', '録音する'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
        <Sidebar />
        <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
          <Navbar />
          <div className="max-w-7xl mx-auto py-10 px-4 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-brown mx-auto mb-4"></div>
              <p className="text-gray-400">設定を読み込み中...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
      <Sidebar />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-white mb-8">設定</h1>
          
          {/* Tab Navigation */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-t-2xl border border-gray-700/50 border-b-0">
            <div className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-6 py-4 font-medium rounded-tl-2xl transition-all duration-300 ${
                  activeTab === 'profile' 
                    ? 'bg-gray-700/50 text-white border-b-2 border-brand-brown' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >                <User className="w-5 h-5" />
                プロフィール
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 ${
                  activeTab === 'privacy' 
                    ? 'bg-gray-700/50 text-white border-b-2 border-brand-brown' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >                <Shield className="w-5 h-5" />
                プライバシー
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-2 px-6 py-4 font-medium rounded-tr-2xl transition-all duration-300 ${
                  activeTab === 'notifications' 
                    ? 'bg-gray-700/50 text-white border-b-2 border-brand-brown' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >                <Bell className="w-5 h-5" />
                通知
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-b-2xl border border-gray-700/50 p-8">
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">プロフィール情報</h2>
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/80 transition-colors"
                    >                      <Edit3 className="w-4 h-4" />
                      プロフィール編集
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setErrors({});
                        }}
                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                      >
                        キャンセル
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >                        <Save className="w-4 h-4" />
                        {isSubmitting ? '保存中...' : '変更を保存'}
                      </button>
                    </div>
                  )}
                </div>

                {errors.submit && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                    {errors.submit}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      表示名
                    </label>
                    <input
                      type="text"
                      value={formData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="表示名を入力してください"
                    />
                    {errors.displayName && (
                      <p className="text-red-400 text-sm mt-1">{errors.displayName}</p>
                    )}
                  </div>

                  <div>                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ユーザー名
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="ユーザー名を入力してください"
                    />
                    {errors.username && (
                      <p className="text-red-400 text-sm mt-1">{errors.username}</p>
                    )}
                  </div>

                  <div>                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      value={currentUser?.email || ''}
                      disabled
                      className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600/30 rounded-lg text-gray-400 opacity-50 cursor-not-allowed"
                    />
                    <p className="text-gray-500 text-xs mt-1">メールアドレスは変更できません</p>
                  </div>

                  <div>                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      スキルレベル
                    </label>
                    <select
                      value={formData.skillLevel}
                      onChange={(e) => handleInputChange('skillLevel', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="beginner">初心者</option>
                      <option value="intermediate">中級者</option>
                      <option value="advanced">上級者</option>
                    </select>
                  </div>

                  <div>                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      場所
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="場所を入力してください"
                    />
                  </div>

                  <div>                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      生年月日
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    自己紹介
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                    placeholder="あなたについて教えてください..."
                  />
                </div>

                <div>                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    楽器
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {instrumentOptions.map((instrument) => (
                      <button
                        key={instrument}
                        type="button"
                        onClick={() => isEditing && handleArrayChange('instruments', instrument)}
                        disabled={!isEditing}
                        className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                          formData.instruments.includes(instrument)
                            ? 'bg-brand-brown text-white border border-brand-brown'
                            : 'bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:bg-gray-700/70 hover:text-white'
                        }`}
                      >
                        {instrument}
                      </button>
                    ))}
                  </div>
                </div>

                <div>                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    好きなジャンル
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {genreOptions.map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => isEditing && handleArrayChange('favoriteGenres', genre)}
                        disabled={!isEditing}
                        className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                          formData.favoriteGenres.includes(genre)
                            ? 'bg-purple-600 text-white border border-purple-600'
                            : 'bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:bg-gray-700/70 hover:text-white'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>

                <div>                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    音楽の目標
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {goalOptions.map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => isEditing && handleArrayChange('goals', goal)}
                        disabled={!isEditing}
                        className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                          formData.goals.includes(goal)
                            ? 'bg-blue-600 text-white border border-blue-600'
                            : 'bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:bg-gray-700/70 hover:text-white'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">プライバシー設定</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <div>                      <h3 className="font-medium text-white">プロフィールの公開</h3>
                      <p className="text-sm text-gray-400">他のユーザーがあなたのプロフィールを表示できるようにする</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-brand-brown bg-gray-700 border-gray-600 rounded focus:ring-brand-brown focus:ring-2"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <div>                      <h3 className="font-medium text-white">練習統計の表示</h3>
                      <p className="text-sm text-gray-400">あなたの練習統計を公開表示する</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-brand-brown bg-gray-700 border-gray-600 rounded focus:ring-brand-brown focus:ring-2"
                    />
                  </div>                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <div>
                      <h3 className="font-medium text-white">実績の表示</h3>
                      <p className="text-sm text-gray-400">他のユーザーがあなたの実績を見ることができる</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-brand-brown bg-gray-700 border-gray-600 rounded focus:ring-brand-brown focus:ring-2"
                    />
                  </div>
                </div>
              </div>
            )}            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-6">通知設定</h2>
                
                <div className="space-y-4">                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <div>
                      <h3 className="font-medium text-white">練習リマインダー</h3>
                      <p className="text-sm text-gray-400">毎日の練習をリマインドする</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-brand-brown bg-gray-700 border-gray-600 rounded focus:ring-brand-brown focus:ring-2"
                    />
                  </div>                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <div>
                      <h3 className="font-medium text-white">実績通知</h3>
                      <p className="text-sm text-gray-400">実績を解除したときに通知する</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-brand-brown bg-gray-700 border-gray-600 rounded focus:ring-brand-brown focus:ring-2"
                    />
                  </div>                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <div>
                      <h3 className="font-medium text-white">メール更新</h3>
                      <p className="text-sm text-gray-400">週次の進捗サマリーをメールで受信する</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-brand-brown bg-gray-700 border-gray-600 rounded focus:ring-brand-brown focus:ring-2"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 