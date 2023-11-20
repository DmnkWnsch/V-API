/**
 * The router for the courses route
 * @module routers/courses
 */

import { Router } from "express";
import courseController from "../controllers/course.controller.js";
import moduleController from "../controllers/module.controller.js";

const courseRouter = Router();

/**
 * Route for getting all courses
 * @name GET /
 */
courseRouter.get("/", courseController.getAllCourses);

/**
 * Route for getting information about a specific course
 * @name GET /:courseId
 * @routeparam {Integer} courseId - the id for the course to get
 */
courseRouter.get("/:courseId", courseController.getCourse);

/**
 * Route for getting all modules for a given course
 * @name GET /:courseId/modules
 * @routeparam {Integer} courseId - the id of the course
 */
courseRouter.get("/:courseId/modules", moduleController.getModulesForCourse);

export default courseRouter;
