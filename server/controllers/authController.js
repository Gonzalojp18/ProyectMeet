import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateJWT from '../utils/generateToken.js'
import bcrypt from 'bcrypt'

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = await req.body;

  if (!name || !email || !password) {
    const err = new Error('You should fill in all the fields');
    err.status = 400;
    next(err);
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    const err = new Error('User already exists');
    err.status = 400;
    return next(err);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword
  })

  const token = generateJWT({ userId: newUser.id, role: newUser.role })

  if (newUser) {
    res.status(201).json({
      token
    })
  } else {
    const err = new Error(
      'Something went wrong went trying to create your account'
    );
    err.status = 500;
    next(err);
  }
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = await req.body;

  if (!email || !password) {
    throw new Error('You should fill out every field')
  }

  const user = await User.findOne({ email });

  if (user || (await bcrypt.compare(password, user.password))) {
    const token = generateJWT({ userId: user._id, role: user.role })
    res.status(200).json({ token , user: { email: user.email, role: user.role } });
  } else {
    res.status(400).json({msg: "User Not Authorized"})
  }
})