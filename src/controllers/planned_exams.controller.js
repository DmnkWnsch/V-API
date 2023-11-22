/**
 * Controller for the planned-exams route
 * @module controllers/planned-exams
 */

import plannedExamsService from "../services/planned_exams.service.js";

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

  if (!payload.exam_id || !payload.date || !payload.register_period_id) {
    res.status(400).send({
      message:
        "One of the keys is missing or empty: 'exam_id', 'date', 'register_period_id'",
    });
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
    res.status(error?.status || 500).send({ message: error?.message || error });
  }
};

export default {
  getPlannedExams,
  addPlannedExam,
};
