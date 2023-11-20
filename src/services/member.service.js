import database from "../database/database.js";

const getAllMembers = async () => {
  const result = await database.query("SELECT * FROM members");

  return result;
};

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
