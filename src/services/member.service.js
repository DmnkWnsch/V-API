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

/**
 * Deletes a member
 * @function
 * @param {Object} memberId - the id of the member to delete
 * @returns {Object}
 */
const deleteMember = async (memberId) => {
  const result = await database.query("DELETE FROM members WHERE id = ?", [
    memberId,
  ]);

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Member with id '${memberId}' does not exist!`,
    };
  }

  return result;
};

/**
 * Updates an existing member
 * @function
 * @param {Object} memberId - the id of the member to update
 * @returns {Object}
 */
const updateMember = async (memberData) => {
  const id = memberData.id;

  const result = await database.query(
    "UPDATE members SET name = ?, last_name = ?, role = ? WHERE id = ?",
    [memberData.name, memberData.lastName, memberData.role, id]
  );

  if (result.affectedRows == 0) {
    throw {
      status: 400,
      message: `Member with id '${id}' does not exist!`,
    };
  }

  const updatedMember = {
    id: id,
    name: memberData.name,
    lastName: memberData.lastName,
    role: memberData.role,
  };

  return updatedMember;
};

export default {
  getAllMembers,
  getMember,
  addMember,
  deleteMember,
  updateMember,
};
