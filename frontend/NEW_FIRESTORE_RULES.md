```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // --- Helper Functions ---
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // --- Data Validation Functions ---

    function isNewSongValid(data) {
      return data.songTitle is string && data.artist is string && data.playerCount == 1;
    }

    function isSongUpdateValid(data, existingData) {
      return data.playerCount == existingData.playerCount + 1 &&
             data.totalPracticeTime > existingData.totalPracticeTime;
    }

    function isUserSongDataValid(data, userId) {
      return data.userId == userId &&
             data.bestScore is number && data.level is number && data.xp is number;
    }
    
    function isLeaderboardEntryValid(data, userId) {
        return data.userId == userId &&
               data.bestScore is number &&
               data.userDisplayName is string;
    }

    function isPracticeHistoryValid(data, userId) {
      return data.userId == userId &&
             data.songId is string &&
             data.duration is number &&
             data.score is number;
    }

    function isRecentSearchValid(data, userId) {
      return data.userId == userId &&
             data.term is string &&
             data.searchedAt is timestamp;
    }

    // --- Collection Rules ---

    // Master list of all songs
    match /songs/{songId} {
      allow read: if true;
      allow create: if isAuthenticated() && isNewSongValid(request.resource.data);
      allow update: if isAuthenticated() && isSongUpdateValid(request.resource.data, resource.data);
    }
    
    // Public data for leaderboards
    match /songLeaderboards/{songId}/entries/{userId} {
        allow read: if isAuthenticated();
        // A user can only write their own entry to the leaderboard
        allow write: if isOwner(userId) && isLeaderboardEntryValid(request.resource.data, userId);
    }

    // User-specific data
    match /users/{userId} {
      allow read, update: if isOwner(userId);

      // Private, detailed song progress for a user
      match /userSongData/{songId} {
        allow read: if isOwner(userId);
        // A user can only write to their own song data
        allow write: if isOwner(userId) && isUserSongDataValid(request.resource.data, userId);
      }
    }

    // Detailed log of all practice sessions
    match /practiceHistory/{historyId} {
      allow read: if isOwner(resource.data.userId);
      // A user can only create their own history entries
      allow create: if isOwner(request.resource.data.userId) && isPracticeHistoryValid(request.resource.data, request.resource.data.userId);
      // History is immutable
      allow update, delete: if false;
    }

    // Recent searches for each user
    match /recentSearches/{searchId} {
      allow read: if isAuthenticated() && isOwner(resource.data.userId);
      // A user can only create their own search entries
      allow create: if isAuthenticated() && isOwner(request.resource.data.userId) && isRecentSearchValid(request.resource.data, request.resource.data.userId);
      // Search history is immutable once created
      allow update, delete: if false;
    }
  }
}
```
