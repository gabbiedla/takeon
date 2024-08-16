// controllers/rsvpController.js
import asyncHandler from '../middleware/asyncHandler.js';
import Rsvp from '../models/rsvpModel.js';

// // Controller function to create a new RSVP
// const createRsvp = asyncHandler(async (req, res) => {
//   console.log(req.body); // Log the request body
//   const { name, email } = req.body;

//   // Create a new RSVP document
//   const newRsvp = await Rsvp.create({
//     name: Rsvp.name,
//     email: Rsvp.email,
//     comments: Rsvp.comments,
//   });

//   res.status(201).json(newRsvp);
// });

// export { createRsvp };
//TEST 2
// const createRsvp = asyncHandler(async (req, res) => {
//   try {
//     console.log(req.body); // Log the request body
//     const { name, email, comments } = req.body;

//     // Create a new RSVP document
//     const newRsvp = await Rsvp.create({ name, email, comments });

//     res.status(201).json(newRsvp);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// export { createRsvp };

/**
 * rsvpDetails_name
          <td class="attributes_item"><strong>Event Name:</strong> {{activity_name}}</td>
          <td class="attributes_item"><strong>Time:</strong> {{activity_time}}</td>
          <td class="attributes_item"><strong>Date:</strong> {{activity_date}}</td>
          <td class="attributes_item"><strong>Location:</strong> {{activity_location}}</td>
          <td class="attributes_item"><strong>Your comments:</strong> {{rsvpDetails_comments}}</td>
      activity_url: 'http://localhost:3000/rsvp',
      google_calendar_url
      user_name
      event_url

      rsvp_notification |
      rsvp_confirmation |
      event_created
 */

const createRsvp = asyncHandler(async (req, res) => {
  try {
    console.log(req.body); // Log the request body
    const { activityId, name, email, comments } = req.body;

    // Create a new RSVP document
    const newRsvp = await Rsvp.create({
      activity: activityId,
      name,
      email,
      comments,
    });

    if (newRsvp) {
      res.status(201).json(newRsvp);
    } else {
      res.status(400);
      throw new Error('Failed to create RSVP');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
