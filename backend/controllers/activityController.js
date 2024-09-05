// create function to get products
import asyncHandler from '../middleware/asyncHandler.js';
import Activity from '../models/activityModel.js';
import { sendEmail } from './emailController.js';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import { createGoogleUrl } from '../utils.js';

// const getActivitiesByUsername = asyncHandler(async (req, res) => {
//   // const userId = req.params.userId;
//   // const { username } = req.params;

//   try {
//     const username = req.params.username;
//     // Find the user by username
//     const user = await User.findOne({ username });
//     // const user = await User.findOne({
//     //   username: { $regex: new RegExp(username, 'i') },
//     // });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Debugging statement
//     console.log('Retrieved userID:', user._id);

//     // Fetch activities based on userId
//     const userId = user._id;
//     const activities = await Activity.find({ userId });

//     res.json(activities);
//   } catch (error) {
//     console.error('Error fetching activities:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// const getActivitiesByUsername = asyncHandler(async (req, res) => {
//   try {
//     const username = req.params.username;
//     // Find the user by username
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Debugging statement
//     console.log('Retrieved userID:', user._id);

//     // Fetch activities based on userId
//     const userId = user._id;
//     const activities = await Activity.find({ userId });

//     res.json(activities);
//   } catch (error) {
//     console.error('Error fetching activities:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

//@desc Fetch all activities of a user
//@route GET /api/activities/:userId
//@access Public
const getActivitiesByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId; // Assuming userId is passed as a parameter in the route

  // Use the userId directly to fetch activities specific to that user ID
  const activities = await Activity.find({ user: userId });

  res.status(200).json(activities);
});
// const getActivitiesByUserId = asyncHandler(async (req, res) => {
//   const userId = req.params.userId;
//   const activities = await Activity.find({ user: userId });

//   if (activities) {
//     res.json(activities);
//   } else {
//     res.status(404);
//     throw new Error('Activities not found for the user');
//   }
// });

// const getActivitiesByUsername = asyncHandler(async (req, res) => {
//   // const { username } = req.params;

//   try {
//     // // Find the user by username to get userId
//     // const user = await user.findOne({ username });
//     // Step 1: Extract the username from the URL parameter.
//     const { username } = req.params;

//     // Step 2: Look up the userId associated with that username from your user model.
//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Fetch activities based on userId
//     const activities = await Activity.find({ userId: user._id });

//     res.json(activities);
//   } catch (error) {
//     console.error('Error fetching activities:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

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
  const { name, date, location, url, time, capacity, category, timeZone = '' } = req.body;

  // Access user information from the request (assuming it's populated by authentication middleware)
  const { user } = req;

  dayjs.extend(customParseFormat);
  dayjs.extend(timezone);
  dayjs.extend(utc);

  // Validate required fields
  // || !date || !location || !url || !time || !capacity
  if (!name || !date || !time) {
    return res
      .status(400)
      .json({ success: false, error: 'Missing required fields' });
  }

  // Perform validation and data sanitization here if needed
  // Format the date before saving to the database
  const dateTimeString = `${date} ${time}`;
  const formattedDate = dayjs.tz(dateTimeString, 'YYYY-MM-DD HH:mm', timeZone).format('YYYY-MM-DD');
  const formattedTime = dayjs.tz(dateTimeString, 'YYYY-MM-DD HH:mm', timeZone).format('hh:mm A');

  console.log('Formatted date:', { date, formattedDate, time, timeZone, formattedTime });

  // Create a new activity
  const newActivity = new Activity({
    user: user._id,
    name,
    date: formattedDate,
    location,
    url,
    time: formattedTime,
    capacity,
    timezone: timeZone,
    category,
  });
  let createdActivity = {};

  try {
    // Save the new activity to the database
    createdActivity = await newActivity.save();

    // send a success email to the person who created the event
    const event_url = `https://myeventlink.co/activity/${createdActivity.id}/view`;
    // Send a success response with the created activity
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

  sendEmail(
    user.email,
    {
      event_name: name,
      event_url: url,
      event_location: location,
      event_date: formattedDate,
      event_time: time,
      google_calendar_url: createGoogleUrl({
        startDate: formattedDate,
        timeZone: timeZone,
        name: encodeURIComponent(name),
        location: encodeURIComponent(location),
        details: encodeURIComponent(`\n\n${url || ''}\n\n${url}`),
      }),
    },
    'event_created'
  );

  res.status(201).json(createdActivity);
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

    res.json({ ...(updatedActivity._doc), message: 'Activity Updated' });
  } else {
    console.log('Activity not found', req.params.id);
    res.status(404).json({ message: 'Activity not found' });
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
  getActivitiesByUserId,
  // getActivitiesByUsername,
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
