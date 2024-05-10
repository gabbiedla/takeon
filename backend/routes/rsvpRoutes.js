// // routes/rsvpRoutes.js

// import express from 'express';
// import { createRsvp } from '../controllers/rsvpController.js';

// const router = express.Router();

// // Routes for handling RSVP operations

// // Create a new RSVP
// router.route('/rsvps').post(createRsvp);

// // // Get all RSVPs
// // router.get('/rsvps', getRSVPs);

// // // Get RSVP by ID
// // router.get('/rsvps/:id', getRSVPById);

// // // Update RSVP by ID
// // router.put('/rsvps/:id', updateRSVP);

// // // Delete RSVP by ID
// // router.delete('/rsvps/:id', deleteRSVP);

// export default router;
import express from 'express';
import { createRsvp } from '../controllers/rsvpController.js';

const router = express.Router();

// POST endpoint to create a new RSVP
router.post('/', createRsvp);

export default router;
