/**
 * Service to work with examiners in the database
 * @module services/examiners
 */

import database from "../database/database.js";

/**
 * Gets all examiners for a specific exam
 * @param {Integer} examPlanId
 * @returns List of examiners for a given exam
 */
const getExaminersForExam = async (examPlanId) => {
  const result = await database.query(
    "SELECT id, name, last_name, exam_plan_id FROM members JOIN examiner ON members.id=examiner.member_id WHERE exam_plan_id = ?",
    [examPlanId]
  );

  return result;
};

/**
 * Get a specific examiner for a specific exam on the exam plan
 * @param {Integer} examPlanId - the id in the exam plan
 * @param {*} memberId - the id of the member
 * @returns Result if memberId is examiner for examPlanId
 */
const getExaminerForExam = async (examPlanId, memberId) => {
  const result = await database.query(
    "SELECT id, name, last_name, exam_plan_id FROM members JOIN examiner ON members.id=examiner.member_id WHERE `exam_plan_id` = ? AND `member_id` = ?",
    [examPlanId, memberId]
  );

  return result;
};

/**
 * Adds a new examiner to the database
 * @param {Object} newExaminer - the object of the examiner to add
 * @returns {Object} The added examiner
 */
const addExaminer = async (newExaminer) => {
  const memberId = newExaminer.memberId;
  const examPlanId = newExaminer.examPlanId;
  const dbExaminer = await getExaminerForExam(examPlanId, memberId);
  if (dbExaminer.length > 0) {
    throw {
      status: 400,
      message: `Examiner with member_id '${memberId}' for planned exam '${examPlanId}' already exists!`,
    };
  }

  await database.query(
    "INSERT INTO examiner (exam_plan_id, member_id) VALUES (?, ?)",
    [examPlanId, memberId]
  );

  const addedExaminer = await getExaminerForExam(examPlanId, memberId);
  return addedExaminer.length > 0 ? addedExaminer[0] : {};
};

/**
 * Deletes an existing examiner
 * @param {Integer} examPlanId - the id of the planned exam
 * @returns {Object} The added examiner
 */
const deleteExaminer = async (examPlanId, memberId) => {
  const result = await database.query(
    "DELETE FROM examiner WHERE `exam_plan_id` = ? AND `member_id` = ?",
    [examPlanId, memberId]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Examiner with id '${memberId}' was not registered!`,
    };
  }

  return result;
};

export default {
  getExaminersForExam,
  addExaminer,
  deleteExaminer,
};
