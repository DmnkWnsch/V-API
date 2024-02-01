/**
 * Controller for the results
 * @module controller/results
 */

import resultService from "../services/result.service.js";
import paramsUtil from "../util/params.util.js";
import responseUtil from "../util/response.util.js";

/**
 * Gets all results a given member has
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.memberId - the id of the member
 */
const getResultsForMember = async (req, res) => {
  const memberId = req.params.memberId;
  const result = await resultService.getResultsForMember(memberId);

  res.json(result);
};

/**
 * Adds a new result to the database
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the result to add
 */
const addNewResult = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["member_id", "module_id", "exam_id", "grade", "term"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  const grade = payload.grade;
  const status = grade > 4 ? "FAILED" : "PASSED";

  const memberId = payload.member_id;
  const moduleId = payload.module_id;
  const examId = payload.exam_id;

  const currentTriesForExam = await resultService.getTriesForMember(
    memberId,
    moduleId,
    examId
  );

  const tryValue = currentTriesForExam + 1;

  const newResult = {
    memberId: payload.member_id,
    moduleId: payload.module_id,
    examId: payload.exam_id,
    try: tryValue,
    grade: payload.grade,
    term: payload.term,
    status: status,
  };

  try {
    const addedResult = await resultService.addNewResult(newResult);
    res.status(201).send({ data: addedResult });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getResultsForMember,
  addNewResult,
};
