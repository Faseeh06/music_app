import React, { useState, useEffect } from 'react';
import { User, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
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

const ProfileSetupPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditMode, setIsEditMode] = useState(false);  const [usernameStatus, setUsernameStatus] = useState<'available' | 'taken' | 'checking' | ''>('');
  
  const [profileData, setProfileData] = useState<UserProfileData>({
    username: '', // Initialize username as empty, will be populated or generated
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
  // Debounced username check - removed for now

  // Check if we're in edit mode and load existing profile data
  useEffect(() => {
    const isEdit = location.pathname === '/profile-edit';
    setIsEditMode(isEdit);

    const navState = location.state as { email?: string; firstName?: string; lastName?: string; isGoogleSignIn?: boolean } | null;
    let initialFirstName = '';
    let initialLastName = '';
    let initialEmail = currentUser?.email || ''; // Get email from currentUser first

    if (navState) {
      initialFirstName = navState.firstName || '';
      initialLastName = navState.lastName || '';
      if (navState.email) initialEmail = navState.email; // Use email from navState if present (e.g., from SignUpForm)
    }
    
    if (currentUser) {
      const loadProfile = async () => {
        try {
          const profile = await getUserProfile(currentUser.uid);
          if (profile) {
            setProfileData({
              username: profile.username || '', // Use existing username
              firstName: profile.firstName || initialFirstName,
              lastName: profile.lastName || initialLastName,
              bio: profile.bio || '',
              location: profile.location || '',
              dateOfBirth: profile.dateOfBirth || '',
              favoriteGenres: profile.favoriteGenres || [],
              instruments: profile.instruments || [],
              skillLevel: profile.skillLevel || 'beginner',
              goals: profile.goals || []
            });
          } else {
            // New user or profile not yet created in Firestore
            const suggestedUsernameBase = 
              currentUser.displayName?.replace(/\s+/g, '').toLowerCase() || 
              initialEmail.split('@')[0].toLowerCase() || 
              'user';
            
            let suggestedUsername = suggestedUsernameBase;
            let attempts = 0;
            // Generate a unique username if the suggested one is taken
            while (!(await isUsernameAvailable(suggestedUsername)) && attempts < 5) {
              attempts++;
              const randomSuffix = Math.random().toString(36).substring(2, 7);
              suggestedUsername = `${suggestedUsernameBase}${randomSuffix}`;
            }
            if (attempts >= 5 && !(await isUsernameAvailable(suggestedUsername))) {
              // If still not unique after 5 attempts, prompt user or handle error
              console.error("Could not generate a unique username automatically.");
              setErrors(prev => ({...prev, username: "Could not generate a unique username. Please choose one."}));
              // Keep suggestedUsername as is, user will have to change it.
            }

            let googleFirstName = '';
            let googleLastName = '';

            if (navState?.isGoogleSignIn && currentUser.displayName) {
              const nameParts = currentUser.displayName.split(' ');
              googleFirstName = nameParts[0] || '';
              googleLastName = nameParts.slice(1).join(' ') || '';
            }

            setProfileData(prev => ({
              ...prev,
              username: suggestedUsername, // Set the generated or validated unique username
              firstName: initialFirstName || googleFirstName,
              lastName: initialLastName || googleLastName,
            }));
          }
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      };
      loadProfile();
    }
  }, [location.pathname, currentUser, location.state]);

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
    setProfileData(prev => ({ ...prev, [name]: value }));    if (name === 'username') {
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

    if (!profileData.firstName?.trim() && !isEditMode) {
      newErrors.firstName = 'First name is required';
    }
    if (!profileData.lastName?.trim() && !isEditMode) {
      newErrors.lastName = 'Last name is required';
    }

    if (!profileData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (profileData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';    } else if (!/^[a-zA-Z0-9_]+$/.test(profileData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!profileData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (profileData.instruments.length === 0) {
      newErrors.instruments = 'Please select at least one instrument';
    }

    if (profileData.favoriteGenres.length === 0) {
      newErrors.favoriteGenres = 'Please select at least one genre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !currentUser) return;

    // Additional check for username availability right before submission
    // This is important if the user changed the auto-generated username
    if (!isEditMode || (isEditMode && profileData.username !== (await getUserProfile(currentUser.uid))?.username)) {
        setUsernameStatus('checking');
        const available = await isUsernameAvailable(profileData.username);
        if (!available) {
            setErrors(prev => ({ ...prev, username: 'Username is already taken. Please choose another.' }));
            setUsernameStatus('taken');
            setLoading(false);
            return;
        }
        setUsernameStatus('available');
    }

    setLoading(true);
    try {
      const userProfilePayload = {
        uid: currentUser.uid,
        email: currentUser.email || (location.state as { email?: string })?.email || '', // Ensure email is included, typed location.state
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
        // createdAt and updatedAt will be handled by Firestore/userService
      };

      // Update Firebase Auth display name
      if (currentUser.displayName !== userProfilePayload.displayName) {
        await updateFirebaseAuthProfile(currentUser, { displayName: userProfilePayload.displayName });
      }

      if (isEditMode) {
        await updateUserServiceProfile(currentUser.uid, userProfilePayload);
        navigate('/profile');
      } else {
        // This is a new profile creation
        await createUserServiceProfile(currentUser, userProfilePayload);
        navigate('/dashboard'); // Or wherever you want to redirect after profile setup
      }
    } catch (error) { // Changed error type to unknown
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
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-brown-200/30 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-brand px-8 py-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/40">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              {isEditMode ? 'Edit Your Profile' : 'Complete Your Profile'}
            </h1>
            <p className="text-white/90 text-lg max-w-md mx-auto">
              {isEditMode ? 'Update your musical information' : 'Tell us about yourself to personalize your music journey'}
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-32 h-32 bg-brand-yellow/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
        </div>

        {/* Form Section */}
        <div className="px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <h3 className="text-xl font-semibold text-brand-dark mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-brand-brown" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>                  <label htmlFor="firstName" className="block text-sm font-medium text-brand-dark mb-2">
                    First Name {!isEditMode && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all ${
                        errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                      }`}
                      placeholder="Enter your first name"
                      disabled={isEditMode && !!currentUser?.displayName}
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>                  <label htmlFor="lastName" className="block text-sm font-medium text-brand-dark mb-2">
                    Last Name {!isEditMode && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all ${
                        errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                      }`}
                      placeholder="Enter your last name"
                      disabled={isEditMode && !!currentUser?.displayName}
                    />
                  </div>
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                {/* Username */}
                <div>                  <label htmlFor="username" className="block text-sm font-medium text-brand-dark mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={profileData.username}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all ${
                        errors.username ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                      }`}
                      placeholder="your_username"
                    />
                    {usernameStatus && (
                      <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        usernameStatus === 'available' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {usernameStatus === 'available' ? '✓' : usernameStatus === 'taken' ? '✗' : '...'}
                      </div>
                    )}
                  </div>
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>

                {/* Date of Birth */}
                <div>                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-brand-dark mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all ${
                        errors.dateOfBirth ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
                      }`}
                    />
                  </div>
                  {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>

                {/* Location */}
                <div className="md:col-span-2">                  <label htmlFor="location" className="block text-sm font-medium text-brand-dark mb-2">
                    Location (Optional)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="md:col-span-2">                  <label htmlFor="bio" className="block text-sm font-medium text-brand-dark mb-2">
                    Bio (Optional)
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your musical journey..."
                  />
                </div>

                {/* Skill Level */}
                <div className="md:col-span-2">                  <label htmlFor="skillLevel" className="block text-sm font-medium text-brand-dark mb-2">
                    Skill Level
                  </label>
                  <select
                    name="skillLevel"
                    id="skillLevel"
                    value={profileData.skillLevel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all"
                  >
                    <option value="beginner">🌱 Beginner</option>
                    <option value="intermediate">🎵 Intermediate</option>
                    <option value="advanced">🎸 Advanced</option>
                    <option value="professional">🎼 Professional</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Musical Preferences Section */}            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
              <h3 className="text-xl font-semibold text-brand-dark mb-4">
                🎵 Musical Preferences
              </h3>

              {/* Instruments */}
              <div className="mb-6">                <label className="block text-sm font-medium text-brand-dark mb-3">
                  Instruments You Play <span className="text-red-500">*</span>
                  <span className="text-gray-500 text-xs ml-1">(Select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {instruments.map((instrument) => (
                    <button
                      key={instrument}
                      type="button"
                      onClick={() => handleArrayToggle('instruments', instrument)}                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all transform hover:scale-105 ${
                        profileData.instruments.includes(instrument)
                          ? 'bg-gradient-brand text-white border-brand-brown shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-brown hover:shadow-md'
                      }`}
                    >
                      {instrument}
                    </button>
                  ))}
                </div>
                {errors.instruments && <p className="text-red-500 text-sm mt-2">{errors.instruments}</p>}
              </div>

              {/* Favorite Genres */}
              <div className="mb-6">                <label className="block text-sm font-medium text-brand-dark mb-3">
                  Favorite Genres <span className="text-red-500">*</span>
                  <span className="text-gray-500 text-xs ml-1">(Select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => handleArrayToggle('favoriteGenres', genre)}                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all transform hover:scale-105 ${
                        profileData.favoriteGenres.includes(genre)
                          ? 'bg-gradient-accent text-brand-dark border-brand-brown shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-brown hover:shadow-md'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                {errors.favoriteGenres && <p className="text-red-500 text-sm mt-2">{errors.favoriteGenres}</p>}
              </div>

              {/* Goals */}
              <div>                <label className="block text-sm font-medium text-brand-dark mb-3">
                  Your Musical Goals
                  <span className="text-gray-500 text-xs ml-1">(Optional - Select all that apply)</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {goals.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => handleArrayToggle('goals', goal)}                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all transform hover:scale-105 text-left ${
                        profileData.goals.includes(goal)
                          ? 'bg-gradient-brand-reverse text-white border-brand-brown shadow-lg'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-brown hover:shadow-md'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full max-w-md mx-auto bg-gradient-brand text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-brown/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    {isEditMode ? 'Updating Profile...' : 'Creating Profile...'}
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    {isEditMode ? '✨ Update Profile' : '🚀 Complete Profile'}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
