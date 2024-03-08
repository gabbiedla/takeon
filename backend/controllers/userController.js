import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import Activity from '../models/activityModel.js';
// import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: '30d',
    // });

    //set JWT as HTTP ONLY Cookie
    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== 'development',
    //   sameSite: 'strict',
    //   maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    // });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      location: user.location,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  // res.send('auth user');
});

//@desc register user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  // res.send('Register user');
  const { name, username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, username, email, password });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc logout user/clear cookie
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  // res.send('Logout user');
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

//@desc get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // res.send('get user profile');
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      location: user.location,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // res.send('update user profile');
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.location = req.body.location || user.location;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      location: updatedUser.location,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc Get users
//@route GET /api/users
//@access Private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

//@desc Get user by ID
//@route GET /api/user/:id
//@access Private/admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send('get user by id');
});

//@desc Get user by Username
//@route GET /api/user/:username
//@access public
// const getUserByUsername = asyncHandler(async (req, res) => {
//   // res.send('get user by id');
//   const username = req.params.username;

//   const user = await User.findOne({ username });

//   if (user) {
//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       username: user.username,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       location: user.location,
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

const getUserByUsername = asyncHandler(async (req, res, next) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const userId = user._id;

    // Find activities by user ID
    const activities = await Activity.find({ user: user._id });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        location: user.location,
      },
      activities: activities,
    });
  } catch (error) {
    next(error);
  }
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

//@desc Update user
//@route PUT /api/users/:id
//@access Private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  getUserByUsername,
  updateUser,
};
