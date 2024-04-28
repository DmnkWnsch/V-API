/**
 * Utility to work with dates
 * @module utils/date
 */

/**
 * Checks if a date is a given amount of days in the future
 * @param {Integer} days - the amount of days to check
 * @param {*} date - the target date
 * @returns whatever the target date is more than x days in the future or not
 */
const isDateInDays = (days, date) => {
  const msPerDay = 86400000;

  const daysTime = days * msPerDay;

  console.log(daysTime);

  const currentDate = new Date();
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  console.log(targetDate);
  console.log(targetDate.getTime() - daysTime);
  console.log(currentDate.getTime());

  return !(targetDate.getTime() - daysTime > currentDate.getTime());
};

/**
 * Checks whatever a given date is between two dates
 * @param {*} date - the date to check
 * @param {*} startDate - the start date of a period
 * @param {*} endDate - the end date of a period
 * @returns if date is between two given dates
 */
const isDateBetween = (date, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 0);

  return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
};

export default {
  isDateInDays,
  isDateBetween,
};
