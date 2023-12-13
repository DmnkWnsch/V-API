/**
 * Controller for the modules route
 * @module controllers/modules
 */

import moduleService from "../services/module.service.js";
import paramsUtil from "../util/params.util.js";
import responseUtil from "../util/response.util.js";

/**
 * Gets all available modules
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllModules = async (req, res) => {
  const modules = await moduleService.getAllModules();
  res.send(modules);
};

/**
 * Gets a module for a specific id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.moduleId - the module id
 */
const getModule = async (req, res) => {
  const moduleId = req.params.moduleId;
  const result = await moduleService.getModule(moduleId);
  res.send(result);
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

/**
 * Creates a new module
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the module to create
 */
const createNewModule = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["id", "name", "credits"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  const newModule = {
    id: payload.id,
    name: payload.name,
    credits: payload.credits,
  };

  try {
    const createdModule = await moduleService.createNewModule(newModule);
    res.status(201).send({ data: createdModule });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getAllModules,
  getModule,
  getModulesForCourse,
  createNewModule,
};
