import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userSchema.js';
import Menu from '../models/menuSchema/menuSchema.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.data.userId).select(['-password']);
      req.menu = await Menu.findOne().select(['-_id', '-createdAt', '-updatedAt', '-__v'])

      next();
    } catch (error) {
      const err = new Error('Not authorized');
      err.status = 401;
      return next(err);
    }
  }

  if (!token) {
    const err = new Error('Not authorized, no token');
    err.status = 401;
    return next(err);
  }
})

export default protect;