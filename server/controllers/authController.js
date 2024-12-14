import asyncHandler from 'express-async-handler';
import User from '../models/userSchema.js';
import generateJWT from '../utils/generateToken.js'
import bcrypt from 'bcrypt'

// @desc Get User Credentials
// @route GET /api/auth
// @access Private
export const getUser = asyncHandler(async (req, res) => {
   res.status(200).json(req.user)
})

// @desc Sign Up User
// @route POST /api/auth/register
// @access Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = await req.body;

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
    role,
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

// @desc Sign in User
// @route POST /api/auth/login
// @access Public
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = await req.body;

  if (!email || !password) {
    const err = new Error('You should fill in all the fields');
    err.status = 400;
    next(err);
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateJWT({ userId: user.id, role: user.role })
    res.status(200).json({ token });
  } else {
    res.status(401).json({msg: "User Not Authorized"})
  }
})

// @desc Update User
// @route PUT /api/auth/:id
// @access Private
export const updateUser = asyncHandler(async (req, res, next) => {
  const findUser = await User.findById(req.params.id);

  if (!findUser) {
    const err = new Error('User not found');
    err.status = 400;
    return next(err);
  }

  if (findUser._id.toString() !== req.user._id) {
    const err = new Error('User not Authorized');
    err.status = 401;
    return next(err);
  }

  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  if (updateUser) {
    res.status(200).json(findUser);
  } else {
    res.status(500).json({ msg: 'Something went wrong while trying to update your user' });
  }
})