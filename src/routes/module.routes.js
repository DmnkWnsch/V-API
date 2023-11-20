/**
 * The router for the modules route
 * @module routers/modules
 */

import { Router } from "express";
import moduleController from "../controllers/module.controller.js";
import examController from "../controllers/exam.controller.js";

const moduleRouter = Router();

/**
 * Route for getting all modules
 * @name GET /
 */
moduleRouter.get("/", moduleController.getAllModules);

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

export default moduleRouter;
