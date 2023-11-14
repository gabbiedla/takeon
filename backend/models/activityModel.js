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
      // required: true,
    },
    date: {
      type: Date,
      // required: true,
      get: function (val) {
        return val ? formatDateString(val) : val;
      },
    },
    time: {
      type: String,
      validate: {
        validator: (value) =>
          // validator: (value) => timeFormatRegex.test(value),
          // Check if value is provided before applying the regular expression
          // return value === undefined || timeFormatRegex.test(value);
          {
            return (
              value === undefined ||
              value.trim() === '' ||
              timeFormatRegex.test(value)
            );
          },
        message: (props) =>
          `${props.value} is not a valid time format (hh:mm AM/PM)`,
      },
      // required: false,
    },
    url: {
      type: String,
      validate: {
        validator: (value) =>
          // validator.isURL(value),
          {
            return (
              value === undefined ||
              value.trim() === '' ||
              timeFormatRegex.test(value)
            );
          },

        message: (props) => `${props.value} is not a valid URL!`,
      },
      // required: false,
    },
    capacity: {
      type: String,
      // required: true,
      // default: 0,
    },
    category: {
      type: String,
      // required: true,
      // default: 0,
    },
  },
  {
    toJSON: {
      getters: true, // Ensure that the `get` function is invoked during JSON serialization
    },
    timestamps: true,
  }
);

function formatDateString(inputDateString) {
  const date = new Date(inputDateString);
  return (
    date.getMonth().toString().padStart(2, '0') +
    '/' +
    date.getDate().toString().padStart(2, '0') +
    '/' +
    date.getFullYear()
  );
}

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
