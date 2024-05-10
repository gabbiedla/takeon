import { RSVPS_URL } from '../constants'; // Assuming you have a constant for your RSVP endpoint
import { apiSlice } from './apiSlice';

export const rsvpsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerRsvp: builder.mutation({
      query: (data) => ({
        url: `${RSVPS_URL}`, // Assuming RSVP_URL is defined in your constants file
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRegisterRsvpMutation } = rsvpsApiSlice;
