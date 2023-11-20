/**
 * Service to work with exams in the database
 * @module services/exams
 */

import database from "../database/database.js";

/**
 * Gets all available exams
 * @function
 * @returns List of exams
 */
const getAllExams = async () => {
  return await database.query("SELECT * FROM exams");
};

/**
 * Gets the exams for a specific module
 * @function
 * @param {Integer} moduleId
 * @returns List of exams for a given module
 */
const getExamsForModule = async (moduleId) => {
  return await database.query("SELECT * FROM exams WHERE module_id = ?", [
    moduleId,
  ]);
};

export default {
  getAllExams,
  getExamsForModule,
};
