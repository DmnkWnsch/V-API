import database from "../database/database.js";

const getPlannedExams = async () => {
  const result = await database.query("SELECT * FROM exam_plan");

  return result;
};

export default {
  getPlannedExams,
};
