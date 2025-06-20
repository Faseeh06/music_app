import { google } from 'googleapis';

import dotenv from 'dotenv';
dotenv.config();

// Create a YouTube client with the API key
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY // This must be a valid API key with YouTube Data API enabled
});

export async function searchVideos(query, maxResults = 10) {
  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: query,
      type: 'video',
      order: 'relevance',
      publishedAfter: '2020-01-01T00:00:00Z', // Optional: filter for videos published after a certain date
      
      maxResults
    });
    
    return response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt
    }));
  } catch (error) {
    console.error('YouTube API Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}