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

/**
 * Adds an exam to the database
 * @function
 * @param {Object} newExam - the object of the exam to add
 * @returns {Object} the exam added to the database
 */
const addExam = async (newExam) => {
  const moduleId = newExam.moduleId;
  const type = newExam.type;
  const dbExam = await getExamByModuleAndType(moduleId, type);
  if (dbExam.length > 0) {
    throw {
      status: 400,
      message: `Exam with module_id '${moduleId}' and type '${type}' already exists!`,
    };
  }

  await database.query("INSERT INTO exams (module_id, type) VALUES (?, ?)", [
    moduleId,
    type,
  ]);

  const examId = await getExamByModuleAndType(moduleId, type);
  newExam.id = examId[0].id;

  return newExam;
};

/**
 * Gets a specific exam for moduleId and type
 * @function
 * @param {Integer} moduleId - the id of the module
 * @param {String} type - the type of the exam
 * @returns Exam
 */
const getExamByModuleAndType = async (moduleId, type) => {
  const result = await database.query(
    "SELECT * FROM exams WHERE `module_id` = ? AND `type` = ?",
    [moduleId, type]
  );

  return result;
};

/**
 * Deletes all exams for a specific module
 * @function
 * @param {Integer} moduleId
 * @returns List of exams for a given module
 */
const deleteExamsForModule = async (moduleId) => {
  const result = await database.query("DELETE FROM exams WHERE module_id = ?", [
    moduleId,
  ]);

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Module with id '${moduleId}' doesnt have any exams!`,
    };
  }

  return result;
};

export default {
  getAllExams,
  getExamsForModule,
  addExam,
  deleteExamsForModule,
};
