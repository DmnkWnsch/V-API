/**
 * Controller for the planned-exams route
 * @module controllers/planned-exams
 */

import plannedExamsService from "../services/planned_exams.service.js";
import registrationService from "../services/registration.service.js";
import paramsUtil from "../util/params.util.js";
import responseUtil from "../util/response.util.js";

/**
 * Gets all planned exams
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPlannedExams = async (req, res) => {
  const result = await plannedExamsService.getPlannedExams();
  res.json(result);
};

/**
 * Gets all planned exams for exam id
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPlannedExamsById = async (req, res) => {
  const examId = req.params.examId;

  try {
    const result = await plannedExamsService.getPlannedExamsById(examId);
    res.status(200).json(result);
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Adds a new exam to the plan
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the exam to add to the plan
 */
const addPlannedExam = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["exam_id", "date", "register_period_id"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  const newPlannedExam = {
    examId: payload.exam_id,
    date: payload.date,
    registerPeriodId: payload.register_period_id,
  };

  try {
    const addedExam = await plannedExamsService.addPlannedExam(newPlannedExam);
    res.status(201).send({ data: addedExam });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Deletes a planned exam
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the exam to delete
 */
const deletePlannedExam = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["plan_id"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  try {
    const deletedExam = await plannedExamsService.deletePlannedExam(
      payload.plan_id
    );

    const deleteRegistrations =
      await registrationService.deleteRegistrationsForPlannedExam(
        payload.plan_id
      );

    res.status(200).send({ data: deletedExam });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Deletes a planned exam
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the exam to delete
 */
const updatePlannedExam = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["plan_id", "date"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  try {
    const updatedExam = await plannedExamsService.updatePlannedExam(
      payload.plan_id,
      payload.date
    );
    res.status(200).send({ data: updatedExam });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getPlannedExams,
  getPlannedExamsById,
  addPlannedExam,
  deletePlannedExam,
  updatePlannedExam,
};
