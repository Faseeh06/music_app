import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  displayName: string | null;
  firstName?: string; // Added
  lastName?: string;  // Added
  bio: string;
  location: string;
  dateOfBirth: string;
  favoriteGenres: string[];
  instruments: string[];
  skillLevel: string;
  goals: string[];
  profileCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  photoURL?: string;
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const isUsernameAvailable = async (username: string): Promise<boolean> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // True if no documents found with that username
  } catch (error) {
    console.error('Error checking username availability:', error);
    return false; // Default to not available on error to be safe
  }
};

export const createUserProfile = async (user: User, additionalData: Partial<UserProfile> = {}): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      let usernameToSave = additionalData.username;

      // If username is provided in additionalData, check its availability
      if (usernameToSave) {
        const available = await isUsernameAvailable(usernameToSave);
        if (!available) {
          throw new Error(`Username "${usernameToSave}" is already taken.`);
        }
      } else {
        // Generate fallback username and ensure it's unique
        const fallbackUsernameBase = user.displayName?.replace(/\s+/g, '').toLowerCase() || 
                                 user.email?.split('@')[0].toLowerCase() || 
                                 'user';
        usernameToSave = fallbackUsernameBase;
        let attempts = 0;
        while (!(await isUsernameAvailable(usernameToSave)) && attempts < 5) {
          attempts++;
          const randomSuffix = Math.random().toString(36).substring(2, 7);
          usernameToSave = `${fallbackUsernameBase}${randomSuffix}`;
        }
        if (attempts >= 5 && !(await isUsernameAvailable(usernameToSave))) {
          throw new Error('Could not generate a unique username.');
        }
      }
      
      // Extract first and last name from displayName if not provided
      let firstName = additionalData.firstName;
      let lastName = additionalData.lastName;

      if ((!firstName || !lastName) && user.displayName) {
        const nameParts = user.displayName.split(' ');
        if (!firstName) firstName = nameParts[0];
        if (!lastName && nameParts.length > 1) lastName = nameParts.slice(1).join(' ');
      }
      
      const defaultProfileData: Omit<UserProfile, 'photoURL' | 'username'> & { username: string, photoURL?: string } = {
        uid: user.uid,
        email: user.email || '',
        username: usernameToSave, // Use the validated or generated unique username
        displayName: additionalData.displayName !== undefined ? additionalData.displayName : (user.displayName || null),
        firstName: firstName || '',
        lastName: lastName || '',
        bio: '',
        location: '',
        dateOfBirth: '',
        favoriteGenres: [],
        instruments: [],
        skillLevel: 'beginner',
        goals: [],
        profileCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const profileToSave: Partial<UserProfile> = { ...defaultProfileData };

      if (user.photoURL) {
        profileToSave.photoURL = user.photoURL;
      }

      // Merge additionalData, ensuring its photoURL (if present and valid) takes precedence
      // or if additionalData explicitly sets photoURL to null/empty string for removal.
      for (const key in additionalData) {
        if (Object.prototype.hasOwnProperty.call(additionalData, key)) {
          const value = additionalData[key as keyof UserProfile];
          if (value !== undefined) {
            (profileToSave as any)[key] = value;
          } else if (key === 'photoURL') {
            // If additionalData has photoURL: undefined, remove it from profileToSave
            delete profileToSave.photoURL;
          }
        }
      }

      await setDoc(userDocRef, profileToSave);
      console.log('User profile created:', profileToSave);
    } else {
      console.log('User profile already exists');
      const existingData = userDoc.data() as UserProfile;
      const updates: Partial<UserProfile> = {};

      const newDisplayName = additionalData.displayName !== undefined ? additionalData.displayName : user.displayName;
      if (newDisplayName !== undefined && newDisplayName !== existingData.displayName) {
        updates.displayName = newDisplayName;
      }

      // Handle photoURL update: use photoURL from additionalData if present, else from user object, 
      // only if it's different from existing or if explicitly set to null/empty to remove.
      let finalPhotoURL: string | null | undefined = additionalData.photoURL;
      if (finalPhotoURL === undefined && user.photoURL !== undefined) { // additionalData doesn't specify, but user object might
        finalPhotoURL = user.photoURL;
      }

      if (finalPhotoURL !== undefined && finalPhotoURL !== existingData.photoURL) {
        updates.photoURL = finalPhotoURL === null ? undefined : finalPhotoURL; // Store null as undefined for Firestore removal, or the string value
      } else if (finalPhotoURL === undefined && existingData.photoURL !== undefined && Object.prototype.hasOwnProperty.call(additionalData, 'photoURL')) {
        // Case: additionalData explicitly set photoURL to undefined, and there was an existing photoURL
        updates.photoURL = undefined; // Mark for removal
      }
      
      if (additionalData.firstName !== undefined && additionalData.firstName !== existingData.firstName) {
        updates.firstName = additionalData.firstName;
      }

      if (additionalData.lastName !== undefined && additionalData.lastName !== existingData.lastName) {
        updates.lastName = additionalData.lastName;
      }

      if (Object.keys(updates).length > 0) {
        const finalUpdates: Partial<UserProfile> = { ...updates };
        // Firestore deletes fields if their value is set to undefined during an update.
        // If photoURL is explicitly null, it will be stored as null.
        if (finalUpdates.photoURL === null) { 
            (finalUpdates as any).photoURL = null; // Explicitly set to null if that's the intent
        } else if (finalUpdates.photoURL === undefined) {
            delete finalUpdates.photoURL; // Or ensure it's deleted if undefined
        }

        await updateDoc(userDocRef, { ...finalUpdates, updatedAt: new Date().toISOString() });
        console.log('User profile updated with new details:', finalUpdates);
      }
    }
  } catch (error) {
    console.error('Error creating user profile:', error);
    // Propagate specific errors like username taken
    if (error instanceof Error && (error.message.includes('is already taken') || error.message.includes('Could not generate'))) {
        throw error;
    }
    throw new Error('Failed to create user profile.'); // Generic error for other cases
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>): Promise<void> => {
  try {
    // If username is being updated, check for availability
    if (updates.username) {
      const currentProfile = await getUserProfile(uid);
      // Only check if the username is actually changing to something new
      if (currentProfile && currentProfile.username !== updates.username) {
        const available = await isUsernameAvailable(updates.username);
        if (!available) {
          throw new Error(`Username "${updates.username}" is already taken.`);
        }
      }
    }

    const userDocRef = doc(db, 'users', uid);
    // Ensure firstName and lastName are included if they are part of updates
    const dataToUpdate: Partial<UserProfile> & { updatedAt: string } = {
      ...updates,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(userDocRef, dataToUpdate);
  } catch (error) {
    console.error('Error updating user profile:', error);
    // Propagate specific errors like username taken
    if (error instanceof Error && error.message.includes('is already taken')) {
        throw error;
    }
    throw new Error('Failed to update user profile.'); // Generic error for other cases
  }
};

export const isProfileComplete = (profile: UserProfile | null): boolean => {
  if (!profile) return false;
  
  return profile.profileCompleted && 
         profile.username.length > 0 &&
         profile.dateOfBirth.length > 0 &&
         profile.instruments.length > 0 &&
         profile.favoriteGenres.length > 0;
};
