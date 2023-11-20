/**
 * Service to work with examiners in the database
 * @module services/examiners
 */

import database from "../database/database.js";

/**
 * Gets all examiners for a specific exam
 * @param {Integer} examPlanId
 * @returns List of examiners for a given exam
 */
const getExaminersForExam = async (examPlanId) => {
  const result = await database.query(
    "SELECT * FROM examiner WHERE exam_plan_id = ?",
    [examPlanId]
  );

  return result;
};

export default {
  getExaminersForExam,
};
