/**
 * Controller for the examiner route
 * @module controllers/examiners
 */

import examinerService from "../services/examiner.service.js";
import paramsUtil from "../util/params.util.js";
import responseUtil from "../util/response.util.js";

/**
 * Get all examiners for a specific exam in the exam plan
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.examPlanId - The id of the exam in the exam plan
 */
const getExaminersForExam = async (req, res) => {
  const examPlanId = req.params.examPlanId;
  const result = await examinerService.getExaminersForExam(examPlanId);

  res.json(result);
};

/**
 * Adds a new examiner
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the examiner to add
 */
const addExaminer = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["exam_plan_id", "member_id"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.createMissingParamsResponse(res, expectedParams);
    return;
  }

  const newExaminer = {
    examPlanId: payload.exam_plan_id,
    memberId: payload.member_id,
  };

  try {
    const addedExaminer = await examinerService.addExaminer(newExaminer);
    res.status(201).send({ data: addedExaminer });
  } catch (error) {
    responseUtil.createDefaultErrorErsponse(res, error);
  }
};

export default {
  getExaminersForExam,
  addExaminer,
};
