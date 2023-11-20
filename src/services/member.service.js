/**
 * Service to work with members in the database
 * @module services/members
 */

import database from "../database/database.js";

/**
 * Gets all members
 * @function
 * @returns List of all Members
 */
const getAllMembers = async () => {
  const result = await database.query("SELECT * FROM members");

  return result;
};

/**
 * Gets information about a specific member
 * @function
 * @param {Integer} memberId
 * @returns Information about the member
 */
const getMember = async (memberId) => {
  const result = await database.query("SELECT * FROM members WHERE `id` = ?", [
    memberId,
  ]);

  return result;
};

export default {
  getAllMembers,
  getMember,
};
