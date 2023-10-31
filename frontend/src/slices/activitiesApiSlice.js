import { ACTIVITIES_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const activitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: () => ({
        url: ACTIVITIES_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetActivitiesQuery } = activitiesApiSlice;
