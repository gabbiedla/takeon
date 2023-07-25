import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    //inside we're putting an object with the fields we want
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: Time,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
