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

export default {
  getPlannedExams,
  addPlannedExam,
};
