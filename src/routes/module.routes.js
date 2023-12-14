/**
 * The router for the modules route
 * @module routers/modules
 */

import { Router } from "express";
import moduleController from "../controllers/module.controller.js";
import examController from "../controllers/exam.controller.js";
import moduleTypesController from "../controllers/module_types.controller.js";

const moduleRouter = Router();

/**
 * Route for getting all modules
 * @name GET /
 */
moduleRouter.get("/", moduleController.getAllModules);

/**
 * Route for creating a new module
 * @name POST /
 * @bodyparam {Integer} id - the id of the module
 * @bodyparam {String} name - the name of the module
 * @bodyparam {Integer} credits - how many credits the module rewards
 */
moduleRouter.post("/", moduleController.createNewModule);

/**
 * Route for getting information about a specific module
 * @name GET /:moduleId
 * @routeparam {Integer} moduleId - the id of the module
 */
moduleRouter.get("/:moduleId", moduleController.getModule);

/**
 * Route for getting all exams of a specific module
 * @name GET /:moduleId/exams
 * @routeparam {Integer} moduleId - the id of the module
 */
moduleRouter.get("/:moduleId/exams", examController.getExamsForModule);

/**
 * Route for getting the different module types for the four different courses
 * @name GET /:moduleId/course-types
 * @routeparam {Integer} moduleId - the id of the module
 */
moduleRouter.get(
  "/:moduleId/course-types",
  moduleTypesController.getCourseTypesForModule
);

/**
 * Route for deleting a specific module
 * @name DELETE /:moduleId
 * @routeparam {Integer} moduleId - the id of the module
 */
moduleRouter.delete("/:moduleId", moduleController.deleteModule);

/**
 * Route for deleting all different module types for the four different courses
 * @name DELETE /:moduleId/course-types
 * @routeparam {Integer} moduleId - the id of the module
 */
moduleRouter.delete(
  "/:moduleId/course-types",
  moduleTypesController.deleteCourseTypesForModule
);

/**
 * Route for deleting all exams for the module
 * @name DELETE /:moduleId/exams
 * @routeparam {Integer} moduleId - the id of the module
 */
moduleRouter.delete("/:moduleId/exams", examController.deleteExamsForModule);

export default moduleRouter;
