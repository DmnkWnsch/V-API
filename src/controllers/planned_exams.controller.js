/**
 * Controller for the planned-exams route
 * @module controllers/planned-exams
 */

import plannedExamsService from "../services/planned_exams.service.js";

/**
 * Gets all planned exams
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPlannedExams = async (req, res) => {
  const result = await plannedExamsService.getPlannedExams();
  res.json(result);
};

export default {
  getPlannedExams,
};
