import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';

// import activities from '../data/activities.js';
// import asyncHandler from '../middleware/asyncHandler.js';
// import Activity from '../models/activityModel.js';
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../controllers/activityController.js';
const router = express.Router();

// Route to get all activities and create a new activity (protected route)
router.route('/').get(protect, getActivities).post(protect, createActivity);
// Route to get a single activity by ID
router
  .route('/:id')
  // .get(protect, admin, getActivityById)
  // .get(protect, getActivityById)
  .get(getActivityById)

  // .put(protect, admin, updateActivity);
  .put(protect, updateActivity)
  .delete(protect, deleteActivity);

router.route('/:id/edit');

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
