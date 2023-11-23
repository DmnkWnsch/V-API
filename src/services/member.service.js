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

/**
 * Adds a new member
 * @function
 * @param {Object} newMember - the object for the new member to add
 * @returns {Object}
 */
const addMember = async (newMember) => {
  await database.query(
    "INSERT INTO members (name, last_name, role) VALUES (?, ?, ?)",
    [newMember.name, newMember.lastName, newMember.role]
  );

  const memberId = await database.query(
    "SELECT LAST_INSERT_ID(id) AS lid from members order by LAST_INSERT_ID(id) desc limit 1;"
  );

  newMember.id = memberId[0].lid;

  return newMember;
};

export default {
  getAllMembers,
  getMember,
  addMember,
};
