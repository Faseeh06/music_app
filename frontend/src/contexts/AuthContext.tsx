import React, { createContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName?: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, displayName?: string) => {
    console.log('AuthContext signup called with:', { email, displayName });
    
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Firebase auth user created:', result.user.uid);
    
    // Only update the Firebase Auth user's display name
    if (displayName && result.user) {
      try {
        await updateProfile(result.user, { displayName });
        console.log('Display name updated for Firebase auth user:', displayName);
      } catch (error) {
        console.error('Error updating display name for Firebase auth user:', error);
        // Optionally, you might want to throw this error or handle it
        // For now, we log it and proceed, as the auth user is created.
      }
    }
    // Firestore profile creation is now handled in Settings page
    return result;
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Firestore profile creation/update is now handled in Settings page
    // We ensure the Firebase Auth user exists and has basic info (displayName, email)
    // from Google.
    console.log('Google Sign-In successful, Firebase Auth user:', result.user.uid);
    return result;
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
