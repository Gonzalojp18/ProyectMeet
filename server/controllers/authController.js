import asyncHandler from 'express-async-handler';
import { AppError } from '../utils/AppError.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  user.lastLogin = new Date();
  await user.save();

  res.json({ token, user: { email: user.email, role: user.role } });
})