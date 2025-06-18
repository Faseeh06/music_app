import express from 'express';
import { searchVideos } from '../services/youtubeServices.mjs';

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    // Add a check to ensure the API key is loaded
    if (!process.env.YOUTUBE_API_KEY) {
      throw new Error('YouTube API key is not configured');
    }
    
    const { query, maxResults = 10 } = req.query;
    const videos = await searchVideos(query, parseInt(maxResults));
    res.json(videos);
  } catch (error) {
    console.error('Error searching videos:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;