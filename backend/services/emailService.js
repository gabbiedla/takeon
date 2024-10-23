// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   // Configure your email service provider here
// });

// const sendConfirmationEmail = async (email, data) => {
//   // Construct your email message here
//   const mailOptions = {
//     from: 'gabsdla@gmail.com',
//     to: email,
//     subject: 'RSVP Confirmation',
//     text: `Dear ${data.name},\nThank you for your RSVP.\nComments: ${data.comments}`,
//   };

//   // Send the email
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Confirmation email sent successfully');
//   } catch (error) {
//     console.error('Error sending confirmation email:', error);
//     throw new Error('Error sending confirmation email');
//   }
// };

// module.exports = { sendConfirmationEmail };

//WORKING BUT NOT WITHOUT APP PASSWORD

// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'allmysubs23@gmail.com',
//     pass: 'Mysubs23',
//   },
// });

// const handleRSVP = (req, res) => {
//   const { name, email, comments, activityName } = req.body;

//   const mailOptions = {
//     from: 'allmysubs23@gmail.com',
//     to: email,
//     subject: 'Confirmation of RSVP',
//     text: `Dear ${name},\n\nThank you for RSVPing for ${activityName}.\n\nYour comments: ${comments}\n\nBest regards,\nYour Organization`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       res.status(500).send('Error sending email');
//     } else {
//       console.log('Email sent:', info.response);
//       res.status(200).send('Email sent successfully');
//     }
//   });
// };

// export { handleRSVP };

// emailservice.js

// import nodemailer from 'nodemailer';
// import { google } from 'googleapis';

// // OAuth 2.0 credentials
// const CLIENT_ID =
//   '754764193989-r0r7npt0ot05bi9mar760pia3eanr4ee.apps.googleusercontent.com';
// const CLIENT_SECRET = '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';
// const REDIRECT_URI = 'http://localhost:3000';
// const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

// // Create a new OAuth2 client
// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );

// // Set the refresh token
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// // Nodemailer transporter setup with OAuth 2.0
// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     type: 'OAuth2',
//     user: 'your_email@gmail.com',
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     refreshToken: REFRESH_TOKEN,
//     accessToken: oAuth2Client.getAccessToken(),
//   },
// });

// export default transporter;
