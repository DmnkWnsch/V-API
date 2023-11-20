import database from "../database/database.js";

const getModulesForCourse = async (courseId) => {
  // Return modules for course x
  const rows = await database.query(
    "SELECT course_id, module_id, type, name, credits, planned_semester FROM course_module_types JOIN modules ON course_module_types.module_id=modules.id WHERE `course_id` = ? ORDER BY module_id",
    [courseId]
  );

  return rows;
};

export default {
  getModulesForCourse,
};
