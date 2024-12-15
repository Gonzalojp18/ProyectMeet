import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import menuRoutes from './routes/menuRoute.js';
import authRoutes from './routes/authRoute.js';
import { errorHandler } from './middleware/errorHandler.js';
import connectDB from './database/db.js';
import colors from 'colors';

dotenv.config();

// Const PORT
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());

// Handling Data
app.use(express.json()); // Get json data
app.use(express.urlencoded({ extended: true })); // Get form data

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);

// Error handling
app.use(errorHandler);

// App listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan);
});
