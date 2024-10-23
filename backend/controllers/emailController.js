// controller.js

// import nodemailer from 'nodemailer';

// const sendEmailConfirmation = (req, res) => {
//   const { name, email, comments, activity } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-email-password',
//     },
//   });

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'RSVP Confirmation',
//     html: `
//       <p>Hi ${name},</p>
//       <p>Thank you for your RSVP to the event ${activity.name}.</p>
//       <p>Event Details:</p>
//       <ul>
//         <li>Name: ${activity.name}</li>
//         <li>Location: ${activity.location}</li>
//         <li>Date: ${activity.date}</li>
//         <li>Time: ${activity.time}</li>
//       </ul>
//       <p>Comments: ${comments}</p>
//       <p>We look forward to seeing you at the event!</p>
//     `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       res
//         .status(500)
//         .json({ error: 'An error occurred while sending email confirmation' });
//     } else {
//       console.log('Email sent:', info.response);
//       res.status(200).json({ message: 'Email confirmation sent successfully' });
//     }
//   });
// };

// export { sendEmailConfirmation };
