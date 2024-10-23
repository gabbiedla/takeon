import mongoose from 'mongoose';
import validator from 'validator';

// const timeFormatRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
const timeFormatRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

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
      // type: Date,
      type: String,

      required: true,
      // get: function (val) {
      //   return val ? formatDateString(val) : val;
      // },
    },
    time: {
      // type: String,
      // validate: {
      //   validator: (value) =>
      // validator: (value) => timeFormatRegex.test(value),
      // Check if value is provided before applying the regular expression
      // return value === undefined || timeFormatRegex.test(value);
      //     {
      //       return (
      //         value === undefined ||
      //         value.trim() === '' ||
      //         timeFormatRegex.test(value)
      //       );
      //     },
      //   message: (props) =>
      //     `${props.value} is not a valid time format (hh:mm AM/PM)`,
      // },
      type: String,
      validate: {
        validator: (value) => {
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
          value === undefined || value.trim() === '' || validator.isURL(value),
        message: (props) => `${props.value} is not a valid URL!`,
      },
      // required: false,
    },
    capacity: {
      type: String,
      // required: true,
      // default: 0,
    },
    timezone: {
      type: String,
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

// function formatDateString(inputDateString) {
//   const date = new Date(inputDateString);
//   return (
//     date.getMonth().toString().padStart(2, '0') +
//     '/' +
//     date.getDate().toString().padStart(2, '0') +
//     '/' +
//     date.getFullYear()
//   );
// }
//working...
// function formatDateString(inputDateString) {
//   return inputDateString.toISOString(); // Returns date in ISO format
// }

// function formatDateString(inputDateString) {
//   const date = new Date(inputDateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   });
// }

// function formatDateString(inputDateString) {
//   const date = new Date(inputDateString);
//   const offset = date.getTimezoneOffset(); // Get the timezone offset in minutes
//   const adjustedDate = new Date(date.getTime() - offset * 60 * 1000); // Adjust the date for the timezone offset
//   return adjustedDate.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   });
// }

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;

// url: {
//   type: String,
//   validate: {
//     validator: (value) =>
//       // validator.isURL(value),
//       {
//         return (
//           value === undefined ||
//           value.trim() === '' ||
//           timeFormatRegex.test(value)
//         );
//       },

//     message: (props) => `${props.value} is not a valid URL!`,
//   },
//   // required: false,
// },
