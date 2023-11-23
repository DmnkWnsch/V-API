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

export default {
  addModuleType,
};
