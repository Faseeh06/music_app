import { google } from 'googleapis';

import dotenv from 'dotenv';
dotenv.config();

// Create a YouTube client with the API key
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY // This must be a valid API key with YouTube Data API enabled
});

// Helper function to format duration from ISO 8601 format
function formatDuration(duration) {
  if (!duration) return 'N/A';
  
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 'N/A';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Helper function to format view count
function formatViewCount(viewCount) {
  if (!viewCount) return undefined;
  
  const views = parseInt(viewCount);
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  } else {
    return views.toString();
  }
}

export async function searchVideos(query, maxResults = 10) {
  try {
    // First, search for videos
    const searchResponse = await youtube.search.list({
      part: 'snippet',
      q: query,
      type: 'video',
      order: 'relevance',
      publishedAfter: '2020-01-01T00:00:00Z', // Optional: filter for videos published after a certain date
      maxResults
    });
    
    if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
      return [];
    }
    
    // Get video IDs for additional details
    const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');
    
    // Get video details including duration and statistics
    const detailsResponse = await youtube.videos.list({
      part: 'contentDetails,statistics',
      id: videoIds
    });
    
    // Combine search results with details
    return searchResponse.data.items.map(item => {
      const details = detailsResponse.data.items?.find(detail => detail.id === item.id.videoId);
      
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        duration: formatDuration(details?.contentDetails?.duration),
        views: formatViewCount(details?.statistics?.viewCount)
      };
    });
  } catch (error) {
    console.error('YouTube API Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}