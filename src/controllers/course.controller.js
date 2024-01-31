/**
 * Controller for the courses route
 * @module controllers/courses
 */

import courseService from "../services/course.service.js";
import paramsUtil from "../util/params.util.js";
import responseUtil from "../util/response.util.js";

/**
 * Get all available courses
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).send(courses);
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Get a specific course
 * @function
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
  const expectedParams = ["name"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  const newCourse = {
    name: payload.name,
  };

  try {
    const createdCourse = await courseService.createNewCourse(newCourse);
    res.status(201).send({ data: createdCourse });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getAllCourses,
  getCourse,
  createNewCourse,
};
