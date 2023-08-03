import express from 'express';
const router = express.Router();
// import activities from '../data/activities.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Activity from '../models/activityModel.js';

//data route serving all products
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const activities = await Activity.find({});
    res.json(activities);
  })
);

// route for serving single product
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id);

    if (activity) {
      return res.json(activity);
    }

    res.status(404).json({ message: 'Product not found' });
  })
);

export default router;
