import database from "../database/database.js";

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
