// import { apiSlice } from './apiSlice'; // Assuming you have a common API slice setup
// import { EMAILS_URL } from '../constants';

// export const emailApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     sendEmailConfirmation: builder.query({
//       query: (email) => ({
//         url: '/api/sendEmailConfirmation',
//         method: 'POST',
//         body: { email }, // Assuming you only need to pass the email address
//       }),
//     }),
//   }),
// });
//------------------------WORKING...
// export const { useSendEmailConfirmationQuery } = emailApiSlice;
// import { apiSlice } from './apiSlice'; // Assuming you have a common API slice setup
// import { EMAILS_URL } from '../constants'; // Assuming you have a constants file with endpoint URLs

// export const emailApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     sendEmailConfirmation: builder.query({
//       query: (email) => ({
//         url: EMAILS_URL,
//         method: 'POST',
//         body: { email },
//       }),
//     }),
//   }),
// });

// export const { useSendEmailConfirmationQuery } = emailApiSlice;
