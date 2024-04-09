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
    "SELECT status, exam_id, date, module_id, type, register_period_id, exam_plan_id FROM exam_registrations JOIN exam_plan ON exam_registrations.exam_plan_id=exam_plan.uid JOIN exams ON exam_plan.exam_id=exams.id WHERE member_id = ?",
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

export default {
  getRegistrationsForMember,
  addRegistration,
  deleteRegistration,
  updateRegistrationState,
  deleteRegistrationsForPlannedExam,
};
