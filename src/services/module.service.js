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

/**
 * Get a specific module
 * @function
 * @param {Integer} moduleId - the id of the module to get
 * @returns Module with given id
 */
const getModule = async (moduleId) => {
  const result = await database.query("SELECT * FROM modules WHERE id = ?", [
    moduleId,
  ]);

  return result;
};

/**
 * Gets all modules
 * @function
 * @returns List of Modules
 */
const getAllModules = async () => {
  const result = await database.query("SELECT * FROM modules");
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

/**
 * Delete a specific module
 * @function
 * @param {Integer} moduleId - the id of the module to get
 */
const deleteModule = async (moduleId) => {
  const result = await database.query("DELETE FROM modules WHERE id = ?", [
    moduleId,
  ]);

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Module with id '${moduleId}' does not exists!`,
    };
  }

  return result;
};

const updateModule = async (moduleData) => {
  const result = await database.query(
    "UPDATE modules SET name = ?, credits = ? WHERE id = ?",
    [moduleData.name, moduleData.credits, moduleData.id]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Module with id '${moduleData.id}' does not exists!`,
    };
  }

  const updatedModule = {
    id: moduleData.id,
    name: moduleData.name,
    credits: moduleData.credits,
  };

  return updatedModule;
};

export default {
  getModulesForCourse,
  getModule,
  createNewModule,
  getAllModules,
  deleteModule,
  updateModule,
};
