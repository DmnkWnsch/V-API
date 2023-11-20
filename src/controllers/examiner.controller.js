/**
 * Controller for the examiner route
 * @module controllers/examiners
 */

import examinerService from "../services/examiner.service.js";

/**
 * Get all examiners for a specific exam in the exam plan
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.examPlanId - The id of the exam in the exam plan
 */
const getExaminersForExam = async (req, res) => {
  const examPlanId = req.params.examPlanId;
  const result = await examinerService.getExaminersForExam(examPlanId);

  res.json(result);
};

export default {
  getExaminersForExam,
};
