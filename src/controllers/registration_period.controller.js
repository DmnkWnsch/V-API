/**
 * Controller for the registration-periods route
 * @module controllers/registration-periods
 */

import registrationPeriodService from "../services/registration_period.service.js";

/**
 * Gets all available registration periods
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getRegistrationPeriods = async (req, res) => {
  const result = await registrationPeriodService.getRegistrationPeriods();
  res.json(result);
};

/**
 * Gets a specific registration period for a given id
 * @function
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

/**
 * Adds a new registration period
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the period to add
 */
const addRegistrationPeriod = async (req, res) => {
  const payload = req.body;

  if (!payload.name || !payload.start_date || !payload.end_date) {
    res.status(400).send({
      message:
        "One of the keys is missing or empty: 'name', 'start_date', 'end_date'",
    });
    return;
  }

  const newPeriod = {
    name: payload.name,
    startDate: payload.start_date,
    endDate: payload.end_date,
  };

  try {
    const createdPeriod = await registrationPeriodService.addRegistrationPeriod(
      newPeriod
    );
    res.status(200).send({ data: createdPeriod });
  } catch (error) {
    res.status(error?.status || 500).send({ message: error?.message || error });
  }
};

export default {
  getRegistrationPeriods,
  getRegistrationPeriod,
  addRegistrationPeriod,
};
