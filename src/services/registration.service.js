/**
 * Service to work with exam registrations in the database
 * @module services/exam-registrations
 */

import database from "../database/database.js";

/**
 * Gets all exams a member is registered for
 * @function
 * @param {Integer} memberId - the id of the member
 * @returns List of exams
 */
const getRegistrationsForMember = async (memberId) => {
  const result = await database.query(
    "SELECT status, exam_id, date, module_id, type, register_period_id, exam_plan_id, name FROM exam_registrations JOIN exam_plan ON exam_registrations.exam_plan_id=exam_plan.uid JOIN exams ON exam_plan.exam_id=exams.id JOIN register_periods ON register_periods.id=exam_plan.register_period_id WHERE member_id = ?",
    [memberId]
  );

  return result;
};

/**
 * Adds a new registration to the database
 * @function
 * @param {Object} newRegistration - the object of the registration to add
 * @returns {Object} the registration that was added to the database
 */
const addRegistration = async (newRegistration) => {
  const memberId = newRegistration.memberId;
  const examPlanId = newRegistration.examPlanId;
  const dbRegistration = await getRegistration(memberId, examPlanId);
  if (dbRegistration.length > 0) {
    throw {
      status: 400,
      message: `Registration for planned exam '${examPlanId}' by member_id '${memberId}' already exists!`,
    };
  }

  await database.query(
    "INSERT INTO exam_registrations (member_id, exam_plan_id, status) VALUES (?, ?, ?)",
    [memberId, examPlanId, newRegistration.status]
  );

  return newRegistration;
};

/**
 * Gets a specific registration
 * @function
 * @param {Integer} memberId - the id of the member
 * @param {Integer} examPlanId - the id of the planned exam
 * @returns Data for the registration
 */
const getRegistration = async (memberId, examPlanId) => {
  const result = await database.query(
    "SELECT * FROM exam_registrations WHERE `member_id` = ? AND `exam_plan_id` = ?",
    [memberId, examPlanId]
  );

  return result;
};

/**
 * Deletes an existing exam registration
 * @param {Integer} memberId - the id of the member
 * @param {Integer} examPlanId - the id of the planned exam
 */
const deleteRegistration = async (memberId, examPlanId) => {
  const result = await database.query(
    "DELETE FROM exam_registrations WHERE member_id = ? AND exam_plan_id = ?",
    [memberId, examPlanId]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Registration for ${examPlanId} by ${memberId} was not found!`,
    };
  }

  return result;
};

/**
 * Updates the state of a registration
 * @param {Integer} memberId - the id of the member
 * @param {Integer} examPlanId - the id of the planned exam
 * @param {String} state - the new state of the registration
 */
const updateRegistrationState = async (memberId, examPlanId, newState) => {
  const result = await database.query(
    "UPDATE exam_registrations SET `status` = ? WHERE member_id = ? AND exam_plan_id = ?",
    [newState, memberId, examPlanId]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Registration for ${examPlanId} by ${memberId} was not found!`,
    };
  }

  return result;
};

/**
 * Deletes ALL registrations for a planned exam
 * @param {Integer} examPlanId - the uid of the planned exam
 * @returns
 */
const deleteRegistrationsForPlannedExam = async (examPlanId) => {
  const result = await database.query(
    "DELETE FROM exam_registrations WHERE exam_plan_id = ?",
    [examPlanId]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `The planned exam for id ${examPlanId} was not found!`,
    };
  }

  return result;
};

/**
 * Deletes a registration for an exam
 * Used for deleting the registration when the member got a result for it
 * @param {Integer} memberId - the id of the member
 * @param {Integer} examId - the id of the exam
 */
const deleteRegistrationForExam = async (memberId, examId, term) => {
  const result = await database.query(
    "DELETE R FROM exam_registrations R JOIN exam_plan ON exam_plan.uid=R.exam_plan_id JOIN register_periods ON register_periods.id=exam_plan.register_period_id WHERE member_id = ? AND exam_id = ? AND name = ?",
    [memberId, examId, term]
  );

  return result;
};

/**
 * Gets registration for a given member for a given exam
 * @param {Integer} memberId - the id of the member
 * @param {Integer} examId - the id of the exam
 * @returns
 */
const getRegistrationForMemberAndExamId = async (memberId, examId) => {
  const result = await database.query(
    "SELECT * FROM exam_registrations JOIN exam_plan ON exam_plan.uid=exam_registrations.exam_plan_id JOIN register_periods ON register_periods.id=exam_plan.register_period_id WHERE member_id = ? AND exam_id = ?",
    [memberId, examId]
  );

  return result;
};

/**
 * Gets all registrations for a specific planned exam
 * @param {Integer} examPlanId - the id of the planned exam
 * @returns
 */
const getRegistrationsForPlannedExam = async (examPlanId) => {
  const result = await database.query(
    "SELECT * FROM exam_registrations JOIN members ON members.id=exam_registrations.member_id JOIN exam_plan ON exam_plan.uid=exam_registrations.exam_plan_id WHERE exam_plan_id = ?",
    [examPlanId]
  );

  return result;
};

export default {
  getRegistrationsForMember,
  addRegistration,
  deleteRegistration,
  updateRegistrationState,
  deleteRegistrationsForPlannedExam,
  deleteRegistrationForExam,
  getRegistrationForMemberAndExamId,
  getRegistrationsForPlannedExam,
};
