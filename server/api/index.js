import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import menuRoutes from '../routes/menuRoute.js';
import authRoutes from '../routes/authRoute.js';
import { errorHandler } from '../middleware/errorHandler.js';
import connectDB from '../database/db.js';
import colors from 'colors';
import API_URI from '../utils/getApiUrl.js'

dotenv.config();


const PORT = process.env.PORT || 3000;

const app = express();

const corsOptions = {
  origin: 'https://proyect-meet-front-end.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
x|
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