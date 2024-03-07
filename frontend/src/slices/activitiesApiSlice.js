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
    getActivityDetails: builder.query({
      query: (activityId) => ({
        url: `${ACTIVITIES_URL}/${activityId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createActivity: builder.mutation({
      query: () => ({
        url: ACTIVITIES_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Activity'],
    }),
    updateActivity: builder.mutation({
      query: (data) => ({
        url: `${ACTIVITIES_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Activity'],
    }),
    deleteActivity: builder.mutation({
      query: (activityId) => ({
        url: `${ACTIVITIES_URL}/${activityId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useGetActivityDetailsQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} = activitiesApiSlice;
