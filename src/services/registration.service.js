import database from "../database/database.js";

const getRegistrationsForMember = async (memberId) => {
  const result = await database.query(
    "SELECT * FROM exam_registrations JOIN exam_plan ON exam_plan.uid=exam_registrations.exam_plan_id WHERE member_id = ?",
    [memberId]
  );

  return result;
};

export default {
  getRegistrationsForMember,
};
