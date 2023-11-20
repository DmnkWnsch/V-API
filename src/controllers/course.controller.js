/**
 * Controller for the courses route
 * @module controllers/courses
 */

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

export default {
  getAllCourses,
  getCourse,
  test,
};
