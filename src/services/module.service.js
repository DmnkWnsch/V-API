import database from "../database/database.js";

const getModulesForCourse = async (courseId) => {
  // Return modules for course x
  const rows = await database.query(
    "SELECT * FROM course_module_types WHERE `course_id` = ?",
    [courseId]
  );

  return rows;
};

export default {
  getModulesForCourse,
};
