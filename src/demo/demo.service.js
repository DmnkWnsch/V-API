/**
 * Service for a demo member id to use the student site of our project
 * @module demo/service
 */

import database from "../database/database.js";

/**
 * Gets the demo member id
 * @returns {Integer} member_id - the id of the member
 */
const getMemberId = async () => {
  const result = await database.query("SELECT * FROM demo WHERE uid = 1");

  return result[0];
};

/**
 * Sets a new demo member id
 * @param {Integer} newMemberId - the new id of the demo member
 * @returns
 */
const updateMemberId = async (newMemberId) => {
  const result = await database.query(
    "UPDATE demo SET member_id = ? WHERE uid = 1",
    [newMemberId]
  );

  return result;
};

export default {
  getMemberId,
  updateMemberId,
};
