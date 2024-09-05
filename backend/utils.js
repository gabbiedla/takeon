import dayjs from 'dayjs';


/**
 * Creates an url to use in the href, to link to Google Calendar create event page
 * @TODO: Add a link to the page to view the event
 *
 * @param {*} event Event information to include in link
 * @param {string} event.name Event information to include in link
 * @param {string} event.location Event information to include in link
 * @param {string} event.startDate Event information to include in link
 * @param {string} event.startTime Event information to include in link
 * @param {string} event.timeZone Event information to include in link
 * @param {string} event.details Event information to include in link
 * @returns {string} URL to use in href
 */
export const createGoogleUrl = (event) => {
  // combine the date and time strings
  const dateTimeString = `${event.startDate} ${event.startTime}`;

  // Parse the combined datetime string with the specified timezone
  const startDateTime = dayjs.tz(dateTimeString, 'YYYY-MM-DD hh:mm A', event.timeZone);

  // Format the start and end datetime strings
  const startDate = startDateTime.format('YYYYMMDDTHHmmssZ');
  const endDate = startDateTime.add(1, 'hour').format('YYYYMMDDTHHmmssZ');

  const timeZone = event.timeZone || '';
  const details = event.details || '';
  const title = event.name || '';
  const location = event.location || '';

  const URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${endDate}&ctz=${timeZone}&location=${location}`;

  return URL;
};
