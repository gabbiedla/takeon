import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

//Protect routes

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //Read the JWT from the cookie
  token = req.cookies.jwt;

  // console.log('User in admin middleware:', req.user);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      // Modify the user property to store only the user ID
      // req.user = req.user._id;

      console.log('User in protect middleware:', req.user);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

//Admin Middleware

const admin = (req, res, next) => {
  console.log('User in admin middleware:', req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    console.log('isAdmin property value:', req.user.isAdmin);
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };
