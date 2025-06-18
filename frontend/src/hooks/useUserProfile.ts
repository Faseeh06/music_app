import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useLocation } from 'react-router-dom';
import { UserProfile, getUserProfile, createUserProfile, isProfileComplete } from '../services/userService';

export const useUserProfile = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileNeedsSetup, setProfileNeedsSetup] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        setProfileNeedsSetup(false);
        return;
      }

      try {        let userProfile = await getUserProfile(currentUser.uid);
        
        // If profile doesn't exist, this shouldn't happen if auth is working correctly
        // but we'll handle it as a fallback
        if (!userProfile) {
          console.warn('Profile not found, creating fallback profile');
          const username = currentUser.displayName?.replace(/\s+/g, '').toLowerCase() || 
                          currentUser.email?.split('@')[0].toLowerCase() || 
                          `user${Date.now()}`;
          
          await createUserProfile(currentUser, {
            username: username,
            displayName: currentUser.displayName
          });
          userProfile = await getUserProfile(currentUser.uid);
        }

        setProfile(userProfile);
        const needsSetup = !isProfileComplete(userProfile);
        console.log('Profile loaded:', { 
          profileCompleted: userProfile?.profileCompleted, 
          needsSetup,
          username: userProfile?.username,
          dateOfBirth: userProfile?.dateOfBirth,
          instruments: userProfile?.instruments?.length,
          favoriteGenres: userProfile?.favoriteGenres?.length
        });
        setProfileNeedsSetup(needsSetup);
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [currentUser, location.pathname]);

  const refreshProfile = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const userProfile = await getUserProfile(currentUser.uid);
      setProfile(userProfile);
      setProfileNeedsSetup(!isProfileComplete(userProfile));
    } catch (error) {
      console.error('Error refreshing profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    profileNeedsSetup,
    refreshProfile
  };
};
