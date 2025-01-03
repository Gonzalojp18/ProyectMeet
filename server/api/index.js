import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import menuRoutes from '../routes/menuRoute.js';
import authRoutes from '../routes/authRoute.js';
import { errorHandler } from '../middleware/errorHandler.js';
import connectDB from '../database/db.js';
import colors from 'colors';

dotenv.config();

const baseApiUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'https://meetingrestobar.vercel.app'

const PORT = process.env.PORT || 3000;

const app = express();

const corsOptions = {
  origin: baseApiUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan);
});

export default app;