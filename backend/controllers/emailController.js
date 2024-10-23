<<<<<<< HEAD
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
=======
import postmark from "postmark";

const POSTMARK_API_TOKEN = process.env.POSTMARK_API_TOKEN || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'gabbie@myeventlink.co';

// Send an email:
let client;
const init = () => {
  if (client) {
    return client;
  }

  if (!POSTMARK_API_TOKEN) {
    console.warn('POSTMARK_API_KEY not set');

    return;
  }

  client = new postmark.ServerClient(POSTMARK_API_TOKEN);

  return client;
}


/**
 * Send an email, using the postmark API
 *
 * @param {*} destiny
 * @param {*} data
 * @param {*} template_alias
 * @returns {Promise}
 */
export const sendEmail = (destiny, data, template_alias) => {
  console.log('sending email to', { destiny, template_id: template_alias });

  const client = init();

  if (!client) {
    console.warn('Could not send email, client not initialized', { client });
    return;
  }

  console.log('Sending email with template', { destiny, template_alias, data });
  let result;

  try {
    result = client.sendEmailWithTemplate({
      From: EMAIL_FROM,
      // To: 'test@blackhole.postmarkapp.com',
      To: destiny,
      TemplateAlias: template_alias,
      TemplateModel: { ...data },
    }).then().catch();
    console.log('Sent email', { result });
  } catch (error) {
    console.error('Failed to send email', { error });
  }

  return result;
};

>>>>>>> refs/remotes/origin/main
