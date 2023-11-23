/**
 * Controller for the planned-exams route
 * @module controllers/planned-exams
 */

import plannedExamsService from "../services/planned_exams.service.js";
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

export default {
  getPlannedExams,
  addPlannedExam,
};
