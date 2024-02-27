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
    // res.status(401);
    // throw new Error('Not authorized, no token');
    // If there's no token, treat the user as non-logged in
    req.user = null;
    next();
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

const nonUser = asyncHandler(async (req, res, next) => {
  try {
    // Retrieve the user based on userID (assuming it's provided in the request)
    const userId = req.params.userId; // Assuming userId is in the request parameters
    req.user = await User.findById(userId).select('-password');

    if (!req.user) {
      res.status(404);
      throw new Error('User not found');
    }

    console.log('User in non-user middleware:', req.user);

    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error('Not authorized');
  }
});

export { protect, admin };
