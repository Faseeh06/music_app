import express from 'express';
import youtubeRoutes from './routes/youtube.mjs';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

// Configure CORS more explicitly
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/youtube', youtubeRoutes);

app.listen(3000, () => console.log('Server listening on port 3000'));
