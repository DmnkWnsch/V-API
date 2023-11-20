/**
 * Service to work with planned exams in the database
 * @module services/planned-exams
 */

import database from "../database/database.js";

/**
 * Gets all planned exams
 * @function
 * @returns List of all planned exams
 */
const getPlannedExams = async () => {
  const result = await database.query("SELECT * FROM exam_plan");

  return result;
};

export default {
  getPlannedExams,
};
