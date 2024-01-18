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
  const result = await database.query(
    "SELECT * FROM register_periods ORDER BY start_date DESC"
  );
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

/**
 * Updates an existing registration period
 * @function
 * @param {Object} periodData - the data to update
 * @returns {Object} the updated period data
 */
const updateRegistrationPeriod = async (periodData) => {
  const id = periodData.id;

  const result = await database.query(
    "UPDATE register_periods SET start_date = ?, end_date = ? WHERE id = ?",
    [periodData.start_date, periodData.end_date, id]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Registration period with id '${id}' does not exist!`,
    };
  }

  const updatedPeriod = {
    id: id,
    start_date: start_date,
    end_date: end_date,
  };

  return updatedPeriod;
};

/**
 * Deletes a specific registration period
 * @function
 * @param {Object} periodData - the data to update
 * @returns {Object} the updated period data
 */
const deleteRegistrationPeriod = async (periodId) => {
  const result = await database.query(
    "DELETE FROM register_periods WHERE id = ?",
    [periodId]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Registration period with id '${id}' does not exist!`,
    };
  }

  return result;
};

export default {
  getRegistrationPeriods,
  getRegistrationPeriod,
  getRegistrationPeriodByName,
  addRegistrationPeriod,
  updateRegistrationPeriod,
  deleteRegistrationPeriod,
};
