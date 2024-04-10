/**
 * Controller for the results
 * @module controller/results
 */

import examService from "../services/exam.service.js";
import registrationService from "../services/registration.service.js";
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

    // if type of exam was "TASKS", the written exam should be set to "ALLOWED"
    // if it was on "CONDITIONAL" before (only if there is a registration for it)
    if (addedResult) {
      const examType = await examService.getTypeOfExam(examId);
      if (examType[0].type == "TASKS" && status == "PASSED") {
        // Exam was tasks and they are passed,
        // so we can check if there is a registration
        // for a written exam for the same module
        const writtenExam = await examService.getExamByModuleAndType(
          moduleId,
          "WRITTEN"
        );
        if (writtenExam.length > 0) {
          const writtenExamId = writtenExam[0].id;
          const regs =
            await registrationService.getRegistrationForMemberAndExamId(
              memberId,
              writtenExamId
            );

          if (regs.length > 0) {
            let targetRegistration;
            regs.forEach((reg) => {
              if (reg.name == newResult.term) {
                targetRegistration = reg;
              }
            });

            if (targetRegistration) {
              await registrationService.updateRegistrationState(
                memberId,
                targetRegistration.exam_plan_id,
                "ALLOWED"
              );
            }
          }
        }
      }
    }

    // if adding the result is successful, we can delete the registration
    if (addedResult) {
      registrationService.deleteRegistrationForExam(
        memberId,
        examId,
        newResult.term
      );
    }

    res.status(201).send({ data: addedResult });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Deletes a result from the database
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the result to add
 */
const deleteResult = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["member_id", "exam_id", "try"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  try {
    const deletedResult = await resultService.deleteResult(
      payload.member_id,
      payload.exam_id,
      payload.try
    );

    res.status(200).send({ data: deletedResult });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Updates the grade for a specific result
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the result to add
 */
const updateResult = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["member_id", "exam_id", "try", "grade"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  try {
    const status = payload.grade > 4 ? "FAILED" : "PASSED";
    const updatedResult = await resultService.updateResult(
      payload.member_id,
      payload.exam_id,
      payload.try,
      payload.grade,
      status
    );

    res.status(200).send({ data: updatedResult });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getResultsForMember,
  addNewResult,
  deleteResult,
  updateResult,
};
