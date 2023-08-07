// create function to get products
import asyncHandler from '../middleware/asyncHandler.js';
import Activity from '../models/activityModel.js';

//@desc Fetch all products
//@route GET /api/activities
//@access Public
const getActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({});
  res.json(activities);
});

//@desc Fetch A products
//@route GET /api/activity/:id
//@access Public

const getActivityById = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);

  if (activity) {
    return res.json(activity);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export { getActivities, getActivityById };
