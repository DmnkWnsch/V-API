/**
 * Controller for the examiner route
 * @module controllers/examiners
 */

import examinerService from "../services/examiner.service.js";
import paramsUtil from "../util/params.util.js";
import responseUtil from "../util/response.util.js";
import memberService from "../services/member.service.js";

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
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  const dbMember = await memberService.getMember(payload.member_id);
  if (dbMember.length == 0) {
    res.status(400).send({
      message: "Member with id " + payload.member_id + " does not exist!",
    });
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
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Deletes an examiner
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the examiner to add
 */
const deleteExaminer = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["exam_plan_id", "member_id"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  try {
    const deletedExaminer = await examinerService.deleteExaminer(
      payload.exam_plan_id,
      payload.member_id
    );
    res.status(200).send({ data: deletedExaminer });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getExaminersForExam,
  addExaminer,
  deleteExaminer,
};
