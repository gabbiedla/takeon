import asyncHandler from '../middleware/asyncHandler.js';
import Rsvp from '../models/rsvpModel.js';
import Activity from '../models/activityModel.js';
import User from '../models/userModel.js';
import { sendEmail } from './emailController.js';
import dayjs from 'dayjs';
import { createGoogleUrl } from '../utils.js';

const createRsvp = asyncHandler(async (req, res) => {
  const { activityId, name, email, comments } = req.body;

  const activity = await Activity.findById(activityId);
  const user = await User.findById(activity.user);
  let newRsvp;

  try {
    // Create a new RSVP document
    newRsvp = await Rsvp.create({
      activity: activityId,
      name,
      email,
      comments,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  console.log('Creating RSVP for activity', { activityId, name, email, comments, date: activity.date, });

  if (newRsvp) {
    const event_url = `https://myeventlink.co/activity/${activity.id}/view`;

    const data = {
      activity_name: activity.name,
      rsvpDetails_name: name,
      activity_time: activity.time,
      activity_date: dayjs(activity.date).format('MMMM D, YYYY'),
      activity_location: activity.location,
      rsvpDetails_comments: comments,
      activity_url: activity.url,
      internalCalendarURL: `https://myeventlink.co/home/${user.username}`,
      externalCalendarURL: `https://myeventlink.co/${user.username}`,
      google_calendar_url: createGoogleUrl({
        startDate: activity.date,
        startTime: activity.time,
        timeZone: activity.timezone,
        name: encodeURIComponent(activity.name),
        location: encodeURIComponent(activity.location),
        details: encodeURIComponent(`${comments}\n\n${event_url}\n\n${activity.url}`),
      }),
      user_name: user.name,
      event_url,
    };
    sendEmail(email, data, 'rsvp_confirmation');
    sendEmail(user.email, data, 'rsvp_notification');
  } else {
    res.status(400);
  }

  res.status(201).json(newRsvp);
});

export { createRsvp };

// Controller function to create a new RSVP
// const createRsvp = async (req, res) => {
//   try {
//     const { name, email, comments } = req.body;

//     // Create a new RSVP document
//     const newRsvp = await Rsvp.create({ name, email, comments });

//     res.status(201).json(newRsvp);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Controller for handling RSVP-related operations

// Create a new RSVP
// const createRSVP = async (req, res) => {
//   try {
//     const rsvp = new RSVP(req.body);
//     await rsvp.save();
//     res.status(201).json(rsvp);
//   } catch (error) {
//     console.error('Error creating RSVP:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const createRsvp = async (req, res) => {
//   const { name, email, comments } = req.body;

//   try {
//     const rsvpExists = await Rsvp.findOne({ email });

//     if (rsvpExists) {
//       res.status(400).json({ message: 'RSVP already exists' });
//       return;
//     }

//     const rsvp = await Rsvp.create({
//       name,
//       email,
//       comments,
//     });

//     if (rsvp) {
//       res.status(201).json(rsvp);
//     } else {
//       res.status(400).json({ message: 'Invalid RSVP data' });
//     }
//   } catch (error) {
//     console.error('Error creating RSVP:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const createRsvp = asyncHandler(async (req, res) => {
//   const { name, email, comments } = req.body;

//   const rsvpExists = await Rsvp.findOne({ email });

//   if (rsvpExists) {
//     res.status(400).json({ message: 'RSVP already exists' });
//     return;
//   }

//   const rsvp = await Rsvp.create({
//     name: rsvp.name,
//     email: rsvp.email,
//     comments: rsvp.comments,
//   });

//   if (rsvp) {
//     res.status(201).json(rsvp);
//   } else {
//     res.status(400).json({ message: 'Invalid RSVP data' });
//   }
// });

// export default createRsvp;

// // Get all RSVPs
// const getRSVPs = async (req, res) => {
//   try {
//     const rsvps = await RSVP.find();
//     res.json(rsvps);
//   } catch (error) {
//     console.error('Error getting RSVPs:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get RSVP by ID
// const getRSVPById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const rsvp = await RSVP.findById(id);
//     if (rsvp) {
//       res.json(rsvp);
//     } else {
//       res.status(404).json({ message: 'RSVP not found' });
//     }
//   } catch (error) {
//     console.error('Error getting RSVP by ID:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Update RSVP by ID
// const updateRSVP = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const rsvp = await RSVP.findByIdAndUpdate(id, req.body, { new: true });
//     if (rsvp) {
//       res.json(rsvp);
//     } else {
//       res.status(404).json({ message: 'RSVP not found' });
//     }
//   } catch (error) {
//     console.error('Error updating RSVP:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Delete RSVP by ID
// const deleteRSVP = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const rsvp = await RSVP.findByIdAndDelete(id);
//     if (rsvp) {
//       res.json({ message: 'RSVP deleted' });
//     } else {
//       res.status(404).json({ message: 'RSVP not found' });
//     }
//   } catch (error) {
//     console.error('Error deleting RSVP:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
