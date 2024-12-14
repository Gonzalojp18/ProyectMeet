import express from 'express';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import menuRoutes from './routes/menu.js';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { AppError } from './utils/AppError.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 4000;

dotenv.config({ path: './.env' });

const app = express();

app.use(cors());

// Handling Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);

// Handle 404 routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan);
});
