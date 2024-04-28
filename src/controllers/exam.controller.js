/**
 * Controller for the exams route
 * @module controllers/exams
 */

import examService from "../services/exam.service.js";
import paramsUtil from "../util/params.util.js";
import responseUtil from "../util/response.util.js";

/**
 * Get all available exams
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllExams = async (req, res) => {
  const exams = await examService.getAllExams();
  res.json(exams);
};

/**
 * Get all exams for a given module
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.params.moduleId - the module id
 */
const getExamsForModule = async (req, res) => {
  const moduleId = req.params.moduleId;
  const exams = await examService.getExamsForModule(moduleId);
  res.json(exams);
};

/**
 * Adds a new exam
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload of the exam to add
 */
const addExam = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["module_id", "type"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  const newExam = {
    moduleId: payload.module_id,
    type: payload.type,
  };

  try {
    const addedExam = await examService.addExam(newExam);
    res.status(201).send({ data: addedExam });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Deletes all exams for a given module
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.params.moduleId - the module id
 */
const deleteExamsForModule = async (req, res) => {
  const moduleId = req.params.moduleId;

  try {
    const result = await examService.deleteExamsForModule(moduleId);
    res.status(200).send({ deleted: moduleId });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Gets information about a specific exam
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.params.examId - the exam id
 */
const getExamInformation = async (req, res) => {
  const examId = req.params.examId;

  if (!examId) {
    responseUtil.sendMissingRouteParamsResponse(res, ["examId"]);
    return;
  }

  try {
    const result = await examService.getExamInformation(examId);
    res.status(200).send({ data: result });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getAllExams,
  getExamsForModule,
  addExam,
  deleteExamsForModule,
  getExamInformation,
};
