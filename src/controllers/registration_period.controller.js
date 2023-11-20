/**
 * Controller for the registration-periods route
 * @module controllers/registration-periods
 */

import registrationPeriodService from "../services/registration_period.service.js";

/**
 * Gets all available registration periods
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getRegistrationPeriods = async (req, res) => {
  const result = await registrationPeriodService.getRegistrationPeriods();
  res.json(result);
};

/**
 * Gets a specific registration period for a given id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.periodId - the id of the registration period
 */
const getRegistrationPeriod = async (req, res) => {
  const periodId = req.params.periodId;
  const result = await registrationPeriodService.getRegistrationPeriod(
    periodId
  );

  res.json(result);
};

export default {
  getRegistrationPeriods,
  getRegistrationPeriod,
};
