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
  return await database.query(
    "SELECT * FROM exams WHERE module_id = ? ORDER BY FIELD(type, 'WRITTEN', 'ORAL', 'SEMINAR_PAPER', 'TASKS', 'LABORATORY')",
    [moduleId]
  );
};

/**
 * Gets information about an exam
 * @param {Integer} examId - the id of the exam
 * @returns Information about a specific exam
 */
const getExamInformation = async (examId) => {
  const result = database.query(
    "SELECT * FROM exams JOIN modules ON exams.module_id=modules.id WHERE exams.id = ?",
    [examId]
  );

  return result;
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

/**
 * Gets the type for a specific exam
 * @param {Integer} examId - the id of the exam
 * @returns the type of a given exam
 */
const getTypeOfExam = async (examId) => {
  const result = await database.query("SELECT type FROM exams WHERE id = ?", [
    examId,
  ]);

  if (result.length == 0) {
    throw {
      status: 400,
      message: `The exam with id ${examId} was not found!`,
    };
  }

  return result;
};

/**
 * Gets a list of all exams of a module by searching via the id of a planned exam
 * @param {Integer} examPlanId - the id of the planned exam
 * @returns List of exams of a module by a planned exam
 */
const getModuleExamsByPlannedExam = async (examPlanId) => {
  const result = await database.query(
    "SELECT * FROM exams WHERE module_id = (SELECT module_id FROM exam_plan JOIN exams ON exam_plan.exam_id=exams.id WHERE uid = ?)",
    [examPlanId]
  );

  return result;
};

export default {
  getAllExams,
  getExamsForModule,
  addExam,
  deleteExamsForModule,
  getTypeOfExam,
  getExamByModuleAndType,
  getExamInformation,
  getModuleExamsByPlannedExam,
};
