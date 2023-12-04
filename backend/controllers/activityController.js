// create function to get products
import asyncHandler from '../middleware/asyncHandler.js';
import Activity from '../models/activityModel.js';

//@desc Fetch all products
//@route GET /api/activities
//@access Public
const getActivities = asyncHandler(async (req, res) => {
  // Access user information from the request (assuming it's populated by authentication middleware)
  // const userId = req.user;
  const activities = await Activity.find({ user: req.user._id });
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
  const { name, date, location, url, time, capacity, category } = req.body;

  // Access user information from the request (assuming it's populated by authentication middleware)
  const { user } = req;

  // Validate required fields
  // || !date || !location || !url || !time || !capacity
  if (!name) {
    return res
      .status(400)
      .json({ success: false, error: 'Missing required fields' });
  }
  // !time ||

  // Perform validation and data sanitization here if needed

  // Create a new activity
  const newActivity = new Activity({
    user: user._id,
    name,
    date,
    location,
    url,
    time,
    capacity,
    category,
  });

  try {
    // Save the new activity to the database
    const createdActivity = await newActivity.save();

    // Send a success response with the created activity
    res.status(201).json(createdActivity);
  } catch (error) {
    // Log detailed error information
    console.error('Error creating activity:', error);

    // Send a more detailed error response
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message || 'An error occurred during activity creation',
      stack: error.stack || null,
    });
  }
});

//@desc Update an activity
//@route PUT /api/activities/:id
//@access Private/Admin
const updateActivity = asyncHandler(async (req, res) => {
  //pull data or descturure the date u need from the body
  const { name, location, date, url, capacity, category } = req.body;
  //updating by finding by ID
  const activity = await Activity.findById(req.params.id);
  // check for the activity÷
  if (activity) {
    activity.name = name;
    activity.location = location;
    activity.date = date;
    activity.url = url;
    activity.capacity = capacity;
    activity.category = category;

    const updatedActivity = await activity.save();
    res.json(updatedActivity);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

//@desc Delete an activity
//@route PUT /api/activities/:id
//@access Private/Admin
const deleteActivity = asyncHandler(async (req, res) => {
  //pull data or descturure the date u need from the body
  // const { name, location, date, url, capacity, category } = req.body;
  //updating by finding by ID
  const activity = await Activity.findById(req.params.id);
  // check for the activity÷
  if (activity) {
    await Activity.deleteOne({ _id: activity._id });
    res.status(200).json({ message: 'Activity Deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// try {
// Save the new activity to the database
// const createdActivity = await newActivity.save();

// Send a success response with the created activity
//   res.status(201).json(createdActivity);
// } catch (error) {
// Handle errors and send an appropriate error response
//     console.error('Error creating activity:', error);
//     res.status(500).json({ success: false, error: 'Internal server error' });
//   }
// });

export {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
