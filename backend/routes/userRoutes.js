import express from 'express';
const router = express.Router();
import {
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
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
// import { getActivitiesByUserId } from '../controllers/activityController';

router.route('/').post(registerUser).get(protect, admin, getUsers);
// router.route('/:username').get(getUserByUsername);
router.post('/logout', logoutUser);
// router.post('/login', authUser);
router.post('/auth', authUser);

router.route('/:username').get(getUserByUsername); // New route for fetching user by username
// router.route('/:userId/activities').get(getActivitiesByUserId); // New route to fetch activities by user ID

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUser);

export default router;
