/**
 * Controller for the registration-periods route
 * @module controllers/registration-periods
 */

import registrationPeriodService from "../services/registration_period.service.js";
import paramsUtil from "../util/params.util.js";
import responseUtil from "../util/response.util.js";

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
  const expectedParams = ["name", "start_date", "end_date"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
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
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Deletes a given registration period
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.params.periodId - the id of the period to delete
 */
const deleteRegistrationPeriod = async (req, res) => {
  const periodId = req.params.periodId;

  try {
    const result = await registrationPeriodService.deleteRegistrationPeriod(
      periodId
    );
    res.status(200).send({ deleted: periodId });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Updates a given registration period
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.params.periodId - the id of the period to update
 * @param req.body - the payload for the period
 */
const updateRegistrationPeriod = async (req, res) => {
  const periodId = req.params.periodId;
  const payload = req.body;
  const expectedParams = ["start_date", "end_date"];

  if (!periodId) {
    responseUtil.sendMissingRouteParamsResponse(res, ["periodId"]);
    return;
  }

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  const periodData = {
    id: periodId,
    start_date: payload.start_date,
    end_date: payload.end_date,
  };

  try {
    const updatedPeriod =
      await registrationPeriodService.updateRegistrationPeriod(periodData);
    res.status(200).send({ data: updatedPeriod });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getRegistrationPeriods,
  getRegistrationPeriod,
  addRegistrationPeriod,
  deleteRegistrationPeriod,
  updateRegistrationPeriod,
};
