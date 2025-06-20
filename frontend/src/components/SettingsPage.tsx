import React, { useState, useEffect } from 'react';
import { User, Calendar, MapPin, Settings, Save, Lock, Eye, Bell, Shield } from 'lucide-react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { updateProfile as updateFirebaseAuthProfile } from 'firebase/auth';
import { getUserProfile, updateUserProfile as updateUserServiceProfile, isUsernameAvailable, createUserProfile as createUserServiceProfile } from '../services/userService';

interface UserProfileData {
  username: string;
  firstName?: string;
  lastName?: string;
  bio: string;
  location: string;
  dateOfBirth: string;
  favoriteGenres: string[];
  instruments: string[];
  skillLevel: string;
  goals: string[];
}

interface PrivacySettings {
  profileVisible: boolean;
  shareStats: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

const SettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<'available' | 'taken' | 'checking' | ''>('');
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'notifications'>('profile');
  
  const [profileData, setProfileData] = useState<UserProfileData>({
    username: '',
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    dateOfBirth: '',
    favoriteGenres: [],
    instruments: [],
    skillLevel: 'beginner',
    goals: []
  });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisible: true,
    shareStats: false,
    emailNotifications: true,
    pushNotifications: true
  });

  // Load existing profile data
  useEffect(() => {
    if (currentUser) {
      const loadProfile = async () => {
        try {
          const profile = await getUserProfile(currentUser.uid);
          if (profile) {
            setProfileData({
              username: profile.username || '',
              firstName: profile.firstName || '',
              lastName: profile.lastName || '',
              bio: profile.bio || '',
              location: profile.location || '',
              dateOfBirth: profile.dateOfBirth || '',
              favoriteGenres: profile.favoriteGenres || [],
              instruments: profile.instruments || [],
              skillLevel: profile.skillLevel || 'beginner',
              goals: profile.goals || []
            });
          } else {
            // Create fallback username for new users
            const suggestedUsernameBase = 
              currentUser.displayName?.replace(/\s+/g, '').toLowerCase() || 
              currentUser.email?.split('@')[0].toLowerCase() || 
              'user';
            
            let suggestedUsername = suggestedUsernameBase;
            let attempts = 0;
            while (!(await isUsernameAvailable(suggestedUsername)) && attempts < 5) {
              attempts++;
              const randomSuffix = Math.random().toString(36).substring(2, 7);
              suggestedUsername = `${suggestedUsernameBase}${randomSuffix}`;
            }

            setProfileData(prev => ({
              ...prev,
              username: suggestedUsername,
              firstName: currentUser.displayName?.split(' ')[0] || '',
              lastName: currentUser.displayName?.split(' ').slice(1).join(' ') || '',
            }));
          }
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      };
      loadProfile();
    }
  }, [currentUser]);

  const genres = [
    'Rock', 'Pop', 'Jazz', 'Classical', 'Hip Hop', 'Electronic', 
    'Country', 'Folk', 'R&B', 'Blues', 'Metal', 'Alternative'
  ];

  const instruments = [
    'Guitar', 'Piano', 'Drums', 'Bass', 'Violin', 'Vocals', 
    'Saxophone', 'Trumpet', 'Flute', 'Cello', 'Ukulele', 'Harmonica'
  ];

  const goals = [
    'Learn new songs', 'Improve technique', 'Perform live', 'Record music',
    'Join a band', 'Teach others', 'Compose music', 'Master scales'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (name === 'username') {
      setUsernameStatus('');
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayToggle = (array: keyof Pick<UserProfileData, 'favoriteGenres' | 'instruments' | 'goals'>, item: string) => {
    setProfileData(prev => ({
      ...prev,
      [array]: prev[array].includes(item)
        ? prev[array].filter(i => i !== item)
        : [...prev[array], item]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!profileData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (profileData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(profileData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !currentUser) return;

    // Check username availability
    if (profileData.username) {
      setUsernameStatus('checking');
      const currentProfile = await getUserProfile(currentUser.uid);
      if (!currentProfile || currentProfile.username !== profileData.username) {
        const available = await isUsernameAvailable(profileData.username);
        if (!available) {
          setErrors(prev => ({ ...prev, username: 'Username is already taken. Please choose another.' }));
          setUsernameStatus('taken');
          return;
        }
      }
      setUsernameStatus('available');
    }

    setLoading(true);
    try {
      const userProfilePayload = {
        uid: currentUser.uid,
        email: currentUser.email || '',
        username: profileData.username,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        displayName: `${profileData.firstName} ${profileData.lastName}`.trim(),
        bio: profileData.bio,
        location: profileData.location,
        dateOfBirth: profileData.dateOfBirth,
        favoriteGenres: profileData.favoriteGenres,
        instruments: profileData.instruments,
        skillLevel: profileData.skillLevel,
        goals: profileData.goals,
        profileCompleted: true,
      };

      // Update Firebase Auth display name
      if (currentUser.displayName !== userProfilePayload.displayName) {
        await updateFirebaseAuthProfile(currentUser, { displayName: userProfilePayload.displayName });
      }

      const existingProfile = await getUserProfile(currentUser.uid);
      if (existingProfile) {
        await updateUserServiceProfile(currentUser.uid, userProfilePayload);
      } else {
        await createUserServiceProfile(currentUser, userProfilePayload);
      }

      // Show success message or redirect
      navigate('/profile');
    } catch (error) {
      console.error('Error saving profile:', error);
      let errorMessage = 'Failed to save profile. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
      <Sidebar onCollapse={setSidebarCollapsed} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-brand-brown/20 p-3 rounded-lg border border-brand-brown/30">
                <Settings className="w-6 h-6 text-brand-brown" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-gray-400">Manage your account and preferences</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 mb-8">
            <div className="border-b border-gray-700/50">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'profile', label: 'Profile', icon: User },
                  { id: 'privacy', label: 'Privacy', icon: Shield },
                  { id: 'notifications', label: 'Notifications', icon: Bell }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-brand-brown text-brand-brown'
                          : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'profile' && (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={profileData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-brand-brown"
                          placeholder="Enter your first name"
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={profileData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-brand-brown"
                          placeholder="Enter your last name"
                        />
                      </div>

                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                          Username <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={profileData.username}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-brand-brown ${
                              errors.username ? 'border-red-500 bg-red-900/20' : 'border-gray-600'
                            }`}
                            placeholder="your_username"
                            required
                          />
                          {usernameStatus && (
                            <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                              usernameStatus === 'available' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {usernameStatus === 'available' ? '✓' : usernameStatus === 'taken' ? '✗' : '...'}
                            </div>
                          )}
                        </div>
                        {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                      </div>

                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-300 mb-2">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            value={profileData.dateOfBirth}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-brand-brown"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="location"
                            id="location"
                            value={profileData.location}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-brand-brown"
                            placeholder="City, Country"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          id="bio"
                          value={profileData.bio}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-brand-brown resize-none"
                          placeholder="Tell us about your musical journey..."
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-300 mb-2">
                          Skill Level
                        </label>
                        <select
                          name="skillLevel"
                          id="skillLevel"
                          value={profileData.skillLevel}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-brand-brown"
                        >
                          <option value="beginner">🌱 Beginner</option>
                          <option value="intermediate">🎵 Intermediate</option>
                          <option value="advanced">🎸 Advanced</option>
                          <option value="professional">🎼 Professional</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Musical Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Musical Preferences</h3>
                    
                    {/* Instruments */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Instruments You Play
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {instruments.map((instrument) => (
                          <button
                            key={instrument}
                            type="button"
                            onClick={() => handleArrayToggle('instruments', instrument)}
                            className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                              profileData.instruments.includes(instrument)
                                ? 'bg-brand-brown/20 border-brand-brown text-brand-brown'
                                : 'bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-700/50'
                            }`}
                          >
                            {instrument}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Genres */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Favorite Genres
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {genres.map((genre) => (
                          <button
                            key={genre}
                            type="button"
                            onClick={() => handleArrayToggle('favoriteGenres', genre)}
                            className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                              profileData.favoriteGenres.includes(genre)
                                ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                                : 'bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-700/50'
                            }`}
                          >
                            {genre}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Goals */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Musical Goals
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {goals.map((goal) => (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => handleArrayToggle('goals', goal)}
                            className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                              profileData.goals.includes(goal)
                                ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                                : 'bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-700/50'
                            }`}
                          >
                            {goal}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6 border-t border-gray-700/50">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-brand-brown text-white px-8 py-3 rounded-xl font-medium hover:bg-brand-brown/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>

                  {errors.submit && (
                    <div className="text-red-400 text-sm mt-2 p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                      {errors.submit}
                    </div>
                  )}
                </form>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600 hover:bg-gray-700/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Eye className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">Profile Visibility</div>
                          <div className="text-gray-400 text-sm">Allow others to view your profile</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacySettings.profileVisible}
                        onChange={e => setPrivacySettings(p => ({ ...p, profileVisible: e.target.checked }))}
                        className="w-5 h-5 text-brand-brown rounded focus:ring-brand-brown focus:ring-2"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600 hover:bg-gray-700/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">Share Practice Stats</div>
                          <div className="text-gray-400 text-sm">Share your practice statistics publicly</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacySettings.shareStats}
                        onChange={e => setPrivacySettings(p => ({ ...p, shareStats: e.target.checked }))}
                        className="w-5 h-5 text-brand-brown rounded focus:ring-brand-brown focus:ring-2"
                      />
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600 hover:bg-gray-700/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">Email Notifications</div>
                          <div className="text-gray-400 text-sm">Receive updates via email</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacySettings.emailNotifications}
                        onChange={e => setPrivacySettings(p => ({ ...p, emailNotifications: e.target.checked }))}
                        className="w-5 h-5 text-brand-brown rounded focus:ring-brand-brown focus:ring-2"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600 hover:bg-gray-700/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-white font-medium">Push Notifications</div>
                          <div className="text-gray-400 text-sm">Receive push notifications in browser</div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacySettings.pushNotifications}
                        onChange={e => setPrivacySettings(p => ({ ...p, pushNotifications: e.target.checked }))}
                        className="w-5 h-5 text-brand-brown rounded focus:ring-brand-brown focus:ring-2"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 