import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
// import activities from '../data/activities.js';
// import asyncHandler from '../middleware/asyncHandler.js';
// import Activity from '../models/activityModel.js';
import {
  getActivities,
  getActivityById,
  createActivity,
} from '../controllers/activityController.js';

// Route to get all activities and create a new activity (protected route)
router.route('/').get(getActivities).post(protect, createActivity);
// Route to get a single activity by ID
router.route('/:id').get(getActivityById);

export default router;

//data route serving all products
// router.get(
//   '/',
//   asyncHandler(async (req, res) => {
//     const activities = await Activity.find({});
//     throw new Error('Some error');
//     res.json(activities);
//   })
// );

// route for serving single product
// router.get(
//   '/:id',
//   asyncHandler(async (req, res) => {
//     const activity = await Activity.findById(req.params.id);

//     if (activity) {
//       return res.json(activity);
//     } else {
//       res.status(404);
//       throw new Error('Resource not found');
//     }

// res.status(404).json({ message: 'Product not found' });
//   })
// );
