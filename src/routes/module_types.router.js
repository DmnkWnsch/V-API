/**
 * The router for the module-types route
 * @module router/modules
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

export default moduleTypesRouter;
