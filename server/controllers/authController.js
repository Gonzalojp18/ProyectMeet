import asyncHandler from 'express-async-handler';
import { AppError } from '../utils/AppError.js';
import User from '../models/User.js';
import generateJWT from '../utils/generateToken.js'
import bcrypt from 'bcrypt'

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('You should fill out every field')
  }

  const user = await User.findOne({ email });

  if (user || (await bcrypt.compare(password, user.password))) {
    const token = generateJWT({ userId: user._id, role: user.role }) // Generate JWT
    res.status(200).json({ token , user: { email: user.email, role: user.role } });
  } else {
    res.status(400).json({msg: "User Not Authorized"})
  }
})