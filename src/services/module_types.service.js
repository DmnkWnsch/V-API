/**
 * Service to work with module types in t he database
 * @module services/module-types
 */

import database from "../database/database.js";

/**
 * Adds a new module type to the database
 * @function
 * @param {Object} newModuleType - the payload of the new module type
 * @returns {Object} the added module type
 */
const addModuleType = async (newModuleType) => {
  const moduleId = newModuleType.moduleId;
  const courseId = newModuleType.courseId;
  const dbModuleType = await getModuleType(moduleId, courseId);
  if (dbModuleType.length > 0) {
    throw {
      status: 400,
      message: `Module type with courseId '${courseId}' and moduleId '${moduleId}' already exists!`,
    };
  }

  await database.query(
    "INSERT INTO course_module_types (course_id, module_id, type, planned_semester) VALUES (?, ?, ?, ?)",
    [courseId, moduleId, newModuleType.type, newModuleType.planned_semester]
  );

  return newModuleType;
};

/**
 * Adds a new module type to the database
 * @function
 * @param {Object} moduleTypeData - the payload of the module type to update
 * @returns {Object} the updated module type
 */
const updateModuleType = async (moduleTypeData) => {
  const moduleId = moduleTypeData.moduleId;
  const courseId = moduleTypeData.courseId;

  const result = await database.query(
    "UPDATE course_module_types SET type = ?, planned_semester = ? WHERE course_id = ? AND module_id = ?",
    [moduleTypeData.type, moduleTypeData.planned_semester, courseId, moduleId]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Moduletype with moduleId '${moduleId}' and courseId '${courseId}' does not exist!`,
    };
  }

  const updatedModuleType = {
    courseId: courseId,
    moduleId: moduleId,
    type: moduleTypeData.type,
    planned_semester: moduleTypeData.planned_semester,
  };

  return updatedModuleType;
};

/**
 * Gets a specific module type
 * @function
 * @param {Integer} moduleId - the id of the module
 * @param {Integer} courseId - the id of the course
 * @returns {Array} the module type
 */
const getModuleType = async (moduleId, courseId) => {
  const result = await database.query(
    "SELECT * FROM course_module_types WHERE `course_id` = ? AND `module_id` = ?",
    [courseId, moduleId]
  );

  return result;
};

/**
 * Gets all course types for the given module
 * @function
 * @param {Integer} moduleId - the id of the module
 * @returns List of types of the module in different courses
 */
const getCourseTypesForModule = async (moduleId) => {
  const result = await database.query(
    "SELECT * FROM course_module_types WHERE module_id = ?",
    [moduleId]
  );
  return result;
};

/**
 * Deletes all course types for a given module id
 * @function
 * @param {Integer} moduleId - the id of the module
 */
const deleteCourseTypesForModule = async (moduleId) => {
  const result = await database.query(
    "DELETE FROM course_module_types WHERE module_id = ?",
    [moduleId]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Module with id '${moduleId}' doesnt have any course types!`,
    };
  }

  return result;
};

/**
 * Gets all available types that are stored in the database
 * @function
 * @returns {Object} List of course types
 */
const getUniqueCourseTypes = async () => {
  const result = await database.query(
    "SELECT DISTINCT type FROM course_module_types"
  );

  let resArray = [];
  result.forEach((res) => {
    resArray.push(res.type);
  });

  return resArray;
};

export default {
  getModuleType,
  updateModuleType,
  addModuleType,
  getCourseTypesForModule,
  deleteCourseTypesForModule,
  getUniqueCourseTypes,
};
