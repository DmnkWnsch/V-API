/**
 * Controller for the exams route
 * @module controllers/exams
 */

import examService from "../services/exam.service.js";

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
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.params.moduleId - the module id
 */
const getExamsForModule = async (req, res) => {
  const moduleId = req.params.moduleId;
  const exams = await examService.getExamsForModule(moduleId);
  res.json(exams);
};

export default {
  getAllExams,
  getExamsForModule,
};
