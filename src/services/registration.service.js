import database from "../database/database.js";

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
