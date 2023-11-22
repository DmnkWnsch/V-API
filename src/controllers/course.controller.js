/**
 * Controller for the courses route
 * @module controllers/courses
 */

import courseService from "../services/course.service.js";

/**
 * Get all available courses
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllCourses = (req, res) => {
  res.send({ test: "Get all courses" });
};

/**
 * Get a specific course
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.params.courseId - the course id to get information to
 */
const getCourse = (req, res) => {
  console.log(req);
  res.send({ courseId: req.params.courseId });
};

/**
 * Creates a new course
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the course to create
 */
const createNewCourse = async (req, res) => {
  const payload = req.body;

  if (!payload.name) {
    res.status(400).send({
      message: "One of the keys is missing or empty: 'name'",
    });
    return;
  }

  const newCourse = {
    name: payload.name,
  };

  try {
    const createdCourse = await courseService.createNewCourse(newCourse);
    res.status(201).send({ data: createdCourse });
  } catch (error) {
    res.status(error?.status || 500).send({ message: error?.message || error });
  }
};

export default {
  getAllCourses,
  getCourse,
  createNewCourse,
};
