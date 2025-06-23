# YouTube API Setup Guide

## Prerequisites

1. **Google Cloud Console Account**: You need a Google account with access to Google Cloud Console

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Give your project a name (e.g., "Music Practice App")
4. Click "Create"

### 2. Enable YouTube Data API v3

1. In your project, go to "APIs & Services" → "Library"
2. Search for "YouTube Data API v3"
3. Click on it and press "Enable"

### 3. Create API Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the generated API key
4. (Optional but recommended) Click "Restrict Key" to add restrictions:
   - Application restrictions: Choose based on your deployment
   - API restrictions: Select "YouTube Data API v3"

### 4. Configure the Backend

1. Create a `.env` file in the `backend` directory:
   ```bash
   cd backend
   touch .env
   ```

2. Add your API key to the `.env` file:
   ```
   YOUTUBE_API_KEY=your_actual_api_key_here
   ```

### 5. Start the Backend Server

```bash
cd backend
npm install  # if not already done
npm start
```

The server will run on http://localhost:3000

## Testing the API

Once set up, you can test the API directly:

```bash
curl "http://localhost:3000/api/youtube/search?query=guitar%20tutorial&maxResults=5"
```

## Troubleshooting

### Common Issues:

1. **"YouTube API key is not configured"**
   - Make sure your `.env` file exists and contains `YOUTUBE_API_KEY=your_key`
   - Restart the server after adding the API key

2. **API quota exceeded**
   - YouTube API has daily quotas. Monitor usage in Google Cloud Console
   - Each search request uses about 100 quota units

3. **API key restrictions**
   - If you restricted your API key, make sure the current domain/IP is allowed
   - For development, you might want to temporarily remove restrictions

### API Key Security:

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Consider using environment variables in production deployments

## API Endpoints

- `GET /api/youtube/search?query={search_term}&maxResults={number}`
  - Returns YouTube video search results with titles, thumbnails, durations, and view counts 