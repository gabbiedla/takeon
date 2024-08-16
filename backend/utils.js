import dayjs from 'dayjs';

/**
 * Creates an url to use in the href, to link to Google Calendar create event page
 *
 * @param {*} event Event information to include in link
 * @param {string} event.name Event information to include in link
 * @returns {string} URL to use in href
 */
export const createGoogleUrl = (event) => {
  const startDate = encodeURIComponent(dayjs(event.startDate).format('MMMM D, YYYY'));
  const endDate = encodeURIComponent(dayjs(event.startDate).add(1, 'hour').format('MMMM D, YYYY'));

  const timeZone = event.timeZone || '';
  const details = event.details || '';
  const title = event.name || '';
  const location = event.location || '';

  const URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}=${startDate}/${endDate}&ctz=${timeZone}&location=${location}`;

  return URL;
};
