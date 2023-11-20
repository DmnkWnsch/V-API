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
    "SELECT * FROM results WHERE `member_id` = ?",
    [memberId]
  );

  return result;
};

export default {
  getResultsForMember,
};
