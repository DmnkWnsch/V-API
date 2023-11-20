import database from "../database/database.js";

const getAllExams = async () => {
  return await database.query("SELECT * FROM exams");
};

const getExamsForModule = async (moduleId) => {
  return await database.query("SELECT * FROM exams WHERE module_id = ?", [
    moduleId,
  ]);
};

export default {
  getAllExams,
  getExamsForModule,
};
