# Firebase Setup Instructions

Follow these steps to complete the Firebase authentication setup:

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "music-practice-app")
4. Follow the setup wizard

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication
5. **Enable "Google" authentication:**
   - Click on "Google" in the sign-in providers list
   - Toggle "Enable" to ON
   - Select a support email (usually your own email)
   - Click "Save"

## 3. Get Your Firebase Configuration

1. Go to Project Settings (gear icon in the sidebar)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (</>)
4. Register your app with a name
5. Copy the Firebase configuration object

## 4. Update Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Firebase config:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## 5. Restart Your Development Server

After updating the environment variables, restart your development server:

```bash
npm run dev
```

## Features Now Available

- ✅ User registration with email/password
- ✅ User login with email/password  
- ✅ **Google sign-in (OAuth)**
- ✅ Password reset functionality
- ✅ Automatic login state management
- ✅ Protected routes
- ✅ Logout functionality
- ✅ Form validation and error handling

## Testing

1. Try creating a new account on the sign-up form
2. Check that you're redirected to the dashboard after successful registration
3. Test logout functionality
4. Try logging in with the same credentials
5. Test the "Forgot Password" feature

## Security Notes

- Never commit your `.env` file to version control
- Add `.env` to your `.gitignore` file if it's not already there
- Your Firebase API key is safe to use in client-side code as Firebase has built-in security rules
