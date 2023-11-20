/**
 * Controller for the modules route
 * @module controllers/modules
 */

import moduleService from "../services/module.service.js";

/**
 * Gets all available modules
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllModules = (req, res) => {
  res.send({ test: "Get all modules" });
};

/**
 * Gets a module for a specific id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.moduleId - the module id
 * @todo Implement this function
 */
const getModule = (req, res) => {
  console.log(req);
  res.send({ moduleId: req.params.moduleId });
};

/**
 * Gets all modules with their type for a specific course
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.courseId - the id of the course
 */
const getModulesForCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const modules = await moduleService.getModulesForCourse(courseId);
  res.json(modules);
};

export default {
  getAllModules,
  getModule,
  getModulesForCourse,
};
