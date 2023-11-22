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

const getModule = async (moduleId) => {
  const result = await database.query("SELECT * FROM modules WHERE id = ?", [
    moduleId,
  ]);

  return result;
};

/**
 * Adds a new module to the database
 * @function
 * @param {Object} newModule - the module to create
 * @returns {Object} Object of the created module
 */
const createNewModule = async (newModule) => {
  const moduleId = newModule.id;
  const dbModule = await getModule(moduleId);
  const alreadyExists = dbModule.length > 0;

  if (alreadyExists) {
    throw {
      status: 400,
      message: `Module with id '${moduleId}' already exists!`,
    };
  }

  await database.query(
    "INSERT INTO modules (id, name, credits) VALUES (?, ?, ?)",
    [moduleId, newModule.name, newModule.credits]
  );

  return newModule;
};

export default {
  getModulesForCourse,
  createNewModule,
};
