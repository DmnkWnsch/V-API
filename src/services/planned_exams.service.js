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

/**
 * Gets a specific planned exam
 * @function
 * @param {Integer} exam_id - the id of the exam
 * @param {Date} date - the date of the exam
 * @returns The planned exam
 */
const getPlannedExam = async (exam_id, date) => {
  const result = await database.query(
    "SELECT * FROM exam_plan WHERE `exam_id` = ? AND `date` = ?",
    [exam_id, date]
  );

  return result;
};

/**
 * Gets a planned exem by its uid in the exam plan
 * @param {Integer} examPlanId - the id of the planned exam
 */
const getPlannedExamByUID = async (examPlanId) => {
  const result = await database.query("SELECT * FROM exam_plan WHERE uid = ?", [
    examPlanId,
  ]);

  return result;
};

/**
 * Gets all exams in the plan for given exam id
 * @function
 * @param {Integer} exam_id - the id of the exam
 * @returns The exams in the plan
 */
const getPlannedExamsById = async (exam_id) => {
  const result = await database.query(
    "SELECT * FROM exam_plan JOIN register_periods ON exam_plan.register_period_id=register_periods.id WHERE exam_id = ?",
    [exam_id]
  );

  return result;
};

/**
 * Adds a new planned exam to the database
 * @function
 * @param {Object} newPlannedExam - the object of the planned exam to add
 * @returns {Object} Object of the added exam plan
 */
const addPlannedExam = async (newPlannedExam) => {
  const examId = newPlannedExam.examId;
  const date = newPlannedExam.date;
  const dbExam = await getPlannedExam(examId, date);
  if (dbExam.length > 0) {
    throw {
      status: 400,
      message: `The planned exam for exam_id '${examId}' on '${date}' already exists!`,
    };
  }

  await database.query(
    "INSERT INTO exam_plan (exam_id, date, register_period_id) VALUES (?, ?, ?)",
    [examId, date, newPlannedExam.registerPeriodId]
  );

  const dbId = await getPlannedExam(examId, date);

  newPlannedExam.uid = dbId[0].uid;
  return newPlannedExam;
};

/**
 * Deletes a planned exam
 * @param {Integer} uid - the uid of the planned exam
 * @returns
 */
const deletePlannedExam = async (uid) => {
  const result = await database.query("DELETE FROM exam_plan WHERE uid = ?", [
    uid,
  ]);

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `The specified planned exam was not found (uid ${uid})`,
    };
  }

  return result;
};

/**
 * Updates the date for a planned exam
 * @param {Integer} uid - the uid of the planned exam
 * @param {String} newDate - the new date
 * @returns
 */
const updatePlannedExam = async (uid, newDate) => {
  const result = await database.query(
    "UPDATE exam_plan SET date = ? WHERE uid = ?",
    [newDate, uid]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `The specified planned exam was not found (uid ${uid})`,
    };
  }

  return result;
};

export default {
  getPlannedExams,
  addPlannedExam,
  getPlannedExamsById,
  deletePlannedExam,
  updatePlannedExam,
  getPlannedExamByUID,
};
