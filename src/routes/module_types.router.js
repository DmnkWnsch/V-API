/**
 * The router for the module-types route
 * @module routers/module-types
 */

import { Router } from "express";
import moduleTypesController from "../controllers/module_types.controller.js";

const moduleTypesRouter = Router();

/**
 * Route for creating a new module type
 * @name POST /
 * @bodyparam {Integer} course_id - the id of the course
 * @bodyparam {Integer} module_id - the id of the module
 * @bodyparam {String} type - the type of the module for the specific course
 * @bodyparam {Integer} planned_semester - the semester the module is planned for in the specific course
 */
moduleTypesRouter.post("/", moduleTypesController.addModuleType);

/**
 * Route for updating a module type
 * @name PUT /
 * @bodyparam {Integer} course_id - the id of the course
 * @bodyparam {Integer} module_id - the id of the module
 * @bodyparam {String} type - the type of the module for the specific course
 * @bodyparam {Integer} planned_semester - the semester the module is planned for in the specific course
 */
moduleTypesRouter.put("/", moduleTypesController.updateModuleType);

/**
 * Route for getting all available module types
 * @name GET /available-types
 */
moduleTypesRouter.get(
  "/available-types",
  moduleTypesController.getUniqueCourseTypes
);

export default moduleTypesRouter;
