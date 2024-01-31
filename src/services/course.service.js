/**
 * Service to work with courses in the database
 * @module services/courses
 */

import database from "../database/database.js";

/**
 * Adds a new course to the database
 * @function
 * @param {Object} newCourse - the object of the course to create
 * @returns {Object} Object of the created course
 */
const createNewCourse = async (newCourse) => {
  const courseName = newCourse.name;
  const alreadyExisting = await courseExists(courseName);
  if (alreadyExisting) {
    throw {
      status: 400,
      message: `Course with name '${courseName}' already exists!`,
    };
  }

  await database.query("INSERT INTO courses (name) VALUES (?)", [courseName]);
  const courseId = await database.query(
    "SELECT id FROM courses WHERE `name` = ?",
    [courseName]
  );

  newCourse.id = courseId[0].id;

  return newCourse;
};

/**
 * Gets all courses
 * @function
 * @returns List of courses
 */
const getAllCourses = async () => {
  const result = await database.query("SELECT * FROM courses ORDER BY id");

  return result;
};

/**
 * Checks whatever a course with a given name already exists
 * @function
 * @param {String} courseName - the name of the course
 * @returns {Boolean} whatever the course already exists or not
 */
const courseExists = async (courseName) => {
  const result = await database.query(
    "SELECT * FROM courses WHERE `name` = ?",
    [courseName]
  );

  return result.length > 0;
};

export default {
  getAllCourses,
  createNewCourse,
};
