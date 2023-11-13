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

// @desc Create a new activity
// @route POST /api/activities
// @access Public
const createActivity = asyncHandler(async (req, res) => {
  const {
    activityName,
    activityDate,
    activityLocation,
    activityLink,
    activityTime,
    activityCapacity,
  } = req.body;

  // Perform validation and data sanitization here if needed

  // Create a new activity
  const newActivity = new Activity({
    activityName,
    activityDate,
    activityLocation,
    activityLink,
    activityTime,
    activityCapacity,
  });

  try {
    // Save the new activity to the database
    const createdActivity = await newActivity.save();

    // Send a success response with the created activity
    res.status(201).json(createdActivity);
  } catch (error) {
    // Handle errors and send an appropriate error response
    console.error('Error creating activity:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export { getActivities, getActivityById, createActivity };
