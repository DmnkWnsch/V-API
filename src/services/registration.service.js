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
    "SELECT status, exam_id, date, term, module_id, type FROM exam_registrations JOIN exam_plan ON exam_plan.uid=exam_registrations.exam_plan_id JOIN exams ON exam_plan.exam_id=exams.id WHERE member_id = ?",
    [memberId]
  );

  return result;
};

export default {
  getRegistrationsForMember,
};
