/**
 * Controller for the results
 * @module controller/results
 */

import resultService from "../services/result.service.js";

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
  if (
    !payload.member_id ||
    !payload.module_id ||
    !payload.exam_id ||
    !payload.try ||
    !payload.grade ||
    !payload.term ||
    !payload.status
  ) {
    res.status(400).send({
      message:
        "One of the keys is missing or empty: 'member_id', 'module_id', 'exam_id', 'try', 'grade', 'term', 'status'",
    });
    return;
  }

  const newResult = {
    memberId: payload.member_id,
    moduleId: payload.module_id,
    examId: payload.exam_id,
    try: payload.try,
    grade: payload.grade,
    term: payload.term,
    status: payload.status,
  };

  try {
    const addedResult = await resultService.addNewResult(newResult);
    res.status(201).send({ data: addedResult });
  } catch (error) {
    res.status(error?.status || 500).send({ message: error?.message || error });
  }
};

export default {
  getResultsForMember,
  addNewResult,
};
