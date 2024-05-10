import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const rsvpSchema = new mongoose.Schema(
  {
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Activity', // Reference to the Activity model
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Rsvp = mongoose.model('Rsvp', rsvpSchema);

export default Rsvp;

// user: {
//   type: mongoose.Schema.Types.ObjectId,
//   //   required: true,
//   ref: 'User', // Reference to the User model
// },
// activity: {
//   type: mongoose.Schema.Types.ObjectId,
//   //   required: true,
//   ref: 'Activity', // Reference to the Activity model
// },
// guests: {
//   type: Number,
//   default: 0,
// },
