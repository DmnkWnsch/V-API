/**
 * Service to work with exam results in the database
 * @module services/exam-results
 */

import database from "../database/database.js";

/**
 * Gets all exam results for a given member
 * @function
 * @param {Integer} memberId - the id of the member
 * @returns List of exam results
 */
const getResultsForMember = async (memberId) => {
  const result = await database.query(
    "SELECT results.*, exams.type FROM results JOIN exams ON results.exam_id=exams.id WHERE `member_id` = ? ORDER BY results.module_id, try",
    [memberId]
  );

  return result;
};

/**
 * Get a specific result for a member in an exam
 * @function
 * @param {Integer} memberId - the id of the member
 * @param {Integer} moduleId - the id of the module
 * @param {Integer} examId - the id of the exam
 * @returns The result
 */
const getResult = async (memberId, moduleId, examId) => {
  const result = await database.query(
    "SELECT * FROM results WHERE `member_id` = ? AND `module_id` = ? AND `exam_id` = ?",
    [memberId, moduleId, examId]
  );

  return result;
};

/**
 * Adds a new result for a member to the database
 * @function
 * @param {Object} newResult - the result to add
 * @returns {Object} The newly added result
 */
const addNewResult = async (newResult) => {
  const memberId = newResult.memberId;
  const moduleId = newResult.moduleId;
  const examId = newResult.examId;

  /*const dbResult = await getResult(memberId, moduleId, examId);
  if (dbResult.length > 0) {
    throw {
      status: 400,
      message: `Result with member_id '${memberId}', module_id '${moduleId}' and exam_id '${examId}' already exists!`,
    };
  }*/

  await database.query(
    "INSERT INTO results (member_id, module_id, exam_id, try, grade, term, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      memberId,
      moduleId,
      examId,
      newResult.try,
      newResult.grade,
      newResult.term,
      newResult.status,
    ]
  );

  return newResult;
};

/**
 * Gets the current tries a member has for a specific exam
 * @param {Integer} memberId - the id of the member
 * @param {Integer} moduleId - the id of the module
 * @param {Integer} examId - the id of the exam
 * @returns
 */
const getTriesForMember = async (memberId, moduleId, examId) => {
  const result = await database.query(
    "SELECT * FROM results WHERE member_id = ? AND module_id = ? AND exam_id = ?",
    [memberId, moduleId, examId]
  );

  return result.length;
};

/**
 * Deletes an existing result
 * @param {Integer} memberId - the id of the member
 * @param {Integer} examId - the id of the exam
 * @param {Integer} ptry - the try
 * @returns
 */
const deleteResult = async (memberId, examId, ptry) => {
  const result = await database.query(
    "DELETE FROM results WHERE member_id = ? AND exam_id = ? AND try = ?",
    [memberId, examId, ptry]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Grade for ${memberId} in ${examId} (try ${ptry}) was not found!`,
    };
  }

  return result;
};

/**
 * Updates an existing result
 * @param {Integer} memberId - the id of the member
 * @param {Integer} examId - the id of the exam
 * @param {Integer} ptry - the try
 * @param {String} newGrade - the new grade as decimal
 * @returns
 */
const updateResult = async (memberId, examId, ptry, newGrade, newStatus) => {
  const result = await database.query(
    "UPDATE results SET grade = ?, status = ? WHERE member_id = ? AND exam_id = ? AND try = ?",
    [newGrade, newStatus, memberId, examId, ptry]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Grade for ${memberId} in ${examId} (try ${ptry}) was not found!`,
    };
  }

  return result;
};

export default {
  getResultsForMember,
  getResult,
  addNewResult,
  getTriesForMember,
  deleteResult,
  updateResult,
};
