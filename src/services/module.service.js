/**
 * Service to work with modules in the database
 * @module services/modules
 */

import database from "../database/database.js";

/**
 * Gets all modules with their type for a specific course
 * @function
 * @param {Integer} courseId
 * @returns List of modules for given course
 */
const getModulesForCourse = async (courseId) => {
  // Return modules for course x
  const rows = await database.query(
    "SELECT course_id, module_id, type, name, credits, planned_semester FROM course_module_types JOIN modules ON course_module_types.module_id=modules.id WHERE `course_id` = ? ORDER BY module_id",
    [courseId]
  );

  return rows;
};

export default {
  getModulesForCourse,
};
