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

  if (!payload.module_id || !payload.type) {
    res.status(400).send({
      message: "One of the keys is missing or empty: 'module_id', 'type'",
    });
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
    res.status(error?.status || 500).send({ message: error?.message || error });
  }
};

export default {
  getAllExams,
  getExamsForModule,
  addExam,
};
