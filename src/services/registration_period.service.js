/**
 * Service to work with registration-periods in the database
 * @module services/registration-periods
 */

import database from "../database/database.js";

/**
 * Gets all registration periods
 * @function
 * @returns List of all registration periods
 */
const getRegistrationPeriods = async () => {
  const result = await database.query("SELECT * FROM register_periods");
  return result;
};

/**
 * Gets information about a specific registration period
 * @function
 * @param {Integer} periodId - the id of the registration period
 * @returns Information about the registration period
 */
const getRegistrationPeriod = async (periodId) => {
  const result = await database.query(
    "SELECT * FROM register_periods WHERE `id` = ?",
    [periodId]
  );
  return result;
};

export default {
  getRegistrationPeriods,
  getRegistrationPeriod,
};
