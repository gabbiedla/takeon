import mongoose from 'mongoose';
import validator from 'validator';

const timeFormatRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

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
      type: String,
      validate: {
        validator: (value) => timeFormatRegex.test(value),
        message: (props) =>
          `${props.value} is not a valid time format (hh:mm AM/PM)`,
      },
      // required: true,
    },
    url: {
      type: String,
      validate: {
        validator: (value) => validator.isURL(value),
        message: (props) => `${props.value} is not a valid URL!`,
      },
      required: true,
    },
    capacity: {
      type: String,
      required: true,
      // default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
