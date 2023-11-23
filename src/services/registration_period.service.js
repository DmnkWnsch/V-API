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

/**
 * Gets information about a specific registration period
 * @function
 * @param {String} name - the name of the registration period
 * @returns Information about the registration period
 */
const getRegistrationPeriodByName = async (periodName) => {
  const result = await database.query(
    "SELECT * FROM register_periods WHERE `name` = ?",
    [periodName]
  );
  return result;
};

/**
 * Add a new registration period
 * @function
 * @param {Object} newPeriod - the payload of the new period
 * @returns {Object} the created period
 */
const addRegistrationPeriod = async (newPeriod) => {
  const periodName = newPeriod.name;
  const dbPeriod = await getRegistrationPeriodByName(periodName);
  if (dbPeriod.length > 0) {
    throw {
      status: 400,
      message: `Registration period with name '${periodName}' already exists!`,
    };
  }

  await database.query(
    "INSERT INTO register_periods (name, start_date, end_date) VALUES (?, ?, ?)",
    [periodName, newPeriod.startDate, newPeriod.endDate]
  );

  const periodId = await getRegistrationPeriodByName(periodName);

  newPeriod.id = periodId[0].id;
  return newPeriod;
};

export default {
  getRegistrationPeriods,
  getRegistrationPeriod,
  getRegistrationPeriodByName,
  addRegistrationPeriod,
};
