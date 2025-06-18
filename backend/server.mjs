import express from 'express';
import youtubeRoutes from './routes/youtube.mjs';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors());
app.use('/api/youtube', youtubeRoutes);

app.listen(3000, () => console.log('Server listening on port 3000'));
