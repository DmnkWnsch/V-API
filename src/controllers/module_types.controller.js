/**
 * Controller for the module-types route
 * @module controllers/module-types
 */

import moduleTypesService from "../services/module_types.service.js";

/**
 * Add a new module type
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the module type to create
 */
const addModuleType = async (req, res) => {
  const payload = req.body;

  if (
    !payload.course_id ||
    !payload.module_id ||
    !payload.type ||
    !payload.planned_semester
  ) {
    res.status(400).send({
      message:
        "One of the keys is missing or empty: 'course_id', 'module_id', 'type', 'planned_semester'",
    });
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
    res.status(error?.status || 500).send({ message: error?.message || error });
  }
};

export default {
  addModuleType,
};
