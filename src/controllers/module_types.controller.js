/**
 * Controller for the module-types route
 * @module controllers/module-types
 */

import moduleTypesService from "../services/module_types.service.js";
import paramsUtil from "../util/params.util.js";
import responseUtil from "../util/response.util.js";

/**
 * Add a new module type
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the module type to create
 */
const addModuleType = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["course_id", "module_id", "type", "planned_semester"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  const newModuleType = {
    courseId: payload.course_id,
    moduleId: payload.module_id,
    type: payload.type,
    planned_semester: payload.planned_semester,
  };

  try {
    const createdModuleType = await moduleTypesService.addModuleType(
      newModuleType
    );
    res.status(201).send({ data: createdModuleType });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Add a new module type
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the module type to update
 */
const updateModuleType = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["course_id", "module_id", "type", "planned_semester"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  const moduleTypeData = {
    courseId: payload.course_id,
    moduleId: payload.module_id,
    type: payload.type,
    planned_semester: payload.planned_semester,
  };

  try {
    const updatedModuleType = await moduleTypesService.updateModuleType(
      moduleTypeData
    );
    res.status(200).send({ data: updatedModuleType });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Gets the module types in the different courses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.moduleId - the module id
 */
const getCourseTypesForModule = async (req, res) => {
  const moduleId = req.params.moduleId;
  const result = await moduleTypesService.getCourseTypesForModule(moduleId);
  res.send(result);
};

/**
 * Deletes all course types for a module
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.moduleId - the module id
 */
const deleteCourseTypesForModule = async (req, res) => {
  const moduleId = req.params.moduleId;

  try {
    const result = await moduleTypesService.deleteCourseTypesForModule(
      moduleId
    );
    res.status(200).send({ deleted: moduleId });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  addModuleType,
  updateModuleType,
  getCourseTypesForModule,
  deleteCourseTypesForModule,
};
