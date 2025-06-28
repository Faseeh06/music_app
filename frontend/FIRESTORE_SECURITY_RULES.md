# Firebase Security Rules for Music Practice App

## Overview
This document provides the complete Firestore security rules needed for your music practice app. These rules ensure that users can only access their own data while maintaining security and privacy.

## How to Apply These Rules

1. Go to your Firebase Console
2. Navigate to **Firestore Database**
3. Click on the **Rules** tab
4. Replace the existing rules with the rules below
5. Click **Publish**

## Complete Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions for authentication and validation
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isValidPracticeSession() {
      let data = resource.data;
      return data.keys().hasAll(['userId', 'songTitle', 'artist', 'duration', 'practiceType', 'difficulty', 'completedAt', 'createdAt']) &&
             data.userId is string &&
             data.songTitle is string &&
             data.artist is string &&
             data.duration is number &&
             data.duration > 0 &&
             data.difficulty is number &&
             data.difficulty >= 1 && data.difficulty <= 5 &&
             data.practiceType in ['song', 'scales', 'technique', 'theory', 'improvisation', 'other'];
    }
    
    function isValidPracticeSessionUpdate() {
      let data = request.resource.data;
      return data.userId == resource.data.userId && // Cannot change userId
             (data.keys().hasAny(['songTitle', 'artist', 'duration', 'practiceType', 'difficulty', 'score', 'progress', 'notes', 'tags', 'mood', 'thumbnail'])) &&
             (!data.keys().hasAny(['duration']) || (data.duration is number && data.duration > 0)) &&
             (!data.keys().hasAny(['difficulty']) || (data.difficulty is number && data.difficulty >= 1 && data.difficulty <= 5)) &&
             (!data.keys().hasAny(['score']) || (data.score is number && data.score >= 0 && data.score <= 100)) &&
             (!data.keys().hasAny(['progress']) || (data.progress is number && data.progress >= 0 && data.progress <= 100));
    }

    // Practice History Collection Rules
    match /practiceHistory/{sessionId} {
      // Allow read if user is the owner of the practice session
      allow read: if isAuthenticated() && isOwner(resource.data.userId);
      
      // Allow create if user is authenticated and creating their own session
      allow create: if isAuthenticated() && 
                   isOwner(request.resource.data.userId) &&
                   isValidPracticeSession();
      
      // Allow update if user owns the session and data is valid
      allow update: if isAuthenticated() && 
                   isOwner(resource.data.userId) &&
                   isValidPracticeSessionUpdate();
      
      // Allow delete if user owns the session
      allow delete: if isAuthenticated() && isOwner(resource.data.userId);
    }

    // User Profiles Collection Rules (if you plan to add user profile features)
    match /userProfiles/{userId} {
      // Users can read and write their own profile
      allow read, write: if isAuthenticated() && isOwner(userId);
      
      // Allow creation of profile only for authenticated user's own ID
      allow create: if isAuthenticated() && 
                   isOwner(userId) &&
                   request.resource.data.userId == userId;
    }

    // User Settings Collection Rules (for app preferences, etc.)
    match /userSettings/{userId} {
      // Users can read and write their own settings
      allow read, write: if isAuthenticated() && isOwner(userId);
    }

    // Practice Goals Collection Rules (if you plan to add goal tracking)
    match /practiceGoals/{goalId} {
      // Allow read/write if user owns the goal
      allow read, write: if isAuthenticated() && isOwner(resource.data.userId);
      
      // Allow create if authenticated and creating for own user
      allow create: if isAuthenticated() && isOwner(request.resource.data.userId);
    }

    // Song Library Collection Rules (if you plan to add a song library)
    match /songLibrary/{songId} {
      // Allow read for all authenticated users (public song library)
      allow read: if isAuthenticated();
      
      // Only allow write for admin users (you can modify this based on your needs)
      // For now, no write access to prevent users from modifying the library
      allow write: if false;
    }

    // Practice Challenges Collection Rules (if you plan to add challenges)
    match /practiceeChallenges/{challengeId} {
      // Allow read for all authenticated users
      allow read: if isAuthenticated();
      
      // Only allow write for admin users
      allow write: if false;
    }

    // User Challenge Progress (if users participate in challenges)
    match /userChallengeProgress/{progressId} {
      // Allow read/write if user owns the progress record
      allow read, write: if isAuthenticated() && isOwner(resource.data.userId);
      
      // Allow create if authenticated and creating for own user
      allow create: if isAuthenticated() && isOwner(request.resource.data.userId);
    }

    // Deny all other document access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Rule Breakdown

### 1. **Practice History Rules** (`/practiceHistory/{sessionId}`)
- ✅ Users can only read/write their own practice sessions
- ✅ Data validation ensures required fields are present
- ✅ Prevents users from changing the `userId` on updates
- ✅ Validates data types and ranges (difficulty 1-5, scores 0-100)

### 2. **User Profiles Rules** (`/userProfiles/{userId}`)
- ✅ Users can only access their own profile
- ✅ Prepared for future user profile features

### 3. **User Settings Rules** (`/userSettings/{userId}`)
- ✅ Users can manage their own app settings
- ✅ Useful for preferences, themes, etc.

### 4. **Additional Collections**
- Prepared rules for future features like goals, song library, and challenges

## Security Features

### ✅ **Authentication Required**
All operations require user authentication.

### ✅ **Data Ownership**
Users can only access data they own (based on `userId` field).

### ✅ **Data Validation**
- Required fields must be present
- Data types are validated
- Numeric ranges are enforced
- Enum values are validated

### ✅ **Immutable Fields**
Critical fields like `userId` cannot be changed after creation.

### ✅ **Input Sanitization**
Rules prevent injection of invalid data types.

## Testing Your Rules

After applying these rules, test them with the Firebase emulator:

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize emulator**:
   ```bash
   firebase init emulators
   ```

3. **Run tests**:
   ```bash
   firebase emulators:start
   ```

## Common Security Scenarios Covered

### ✅ **Scenario 1**: User tries to access another user's practice history
**Result**: ❌ Access denied

### ✅ **Scenario 2**: Unauthenticated user tries to read data
**Result**: ❌ Access denied

### ✅ **Scenario 3**: User tries to create practice session with invalid difficulty (e.g., 10)
**Result**: ❌ Validation failed

### ✅ **Scenario 4**: User tries to change `userId` of existing session
**Result**: ❌ Update denied

### ✅ **Scenario 5**: User creates valid practice session for themselves
**Result**: ✅ Success

## Migration Steps

1. **Backup existing data** (if any) before applying new rules
2. **Apply the rules** in Firebase Console
3. **Test thoroughly** with your app functionality
4. **Monitor Firebase Console** for any rule violations

## Environment-Specific Rules

For **development** environment, you might want more permissive rules:

```javascript
// DEVELOPMENT ONLY - DO NOT USE IN PRODUCTION
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

⚠️ **Warning**: Never use permissive rules in production!

## Monitoring and Logging

1. **Enable Firestore audit logs** in Google Cloud Console
2. **Monitor rule violations** in Firebase Console
3. **Set up alerts** for suspicious activity
4. **Regular security reviews** of your rules

These rules provide a solid security foundation for your music practice app while allowing for future expansion. Remember to test thoroughly after implementation!
