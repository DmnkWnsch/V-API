import database from "../database/database.js";

const getExaminersForExam = async (examPlanId) => {
  const result = await database.query(
    "SELECT * FROM examiner WHERE exam_plan_id = ?",
    [examPlanId]
  );

  return result;
};

export default {
  getExaminersForExam,
};
