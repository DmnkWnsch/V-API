import { Router } from "express";
import courseController from "../controllers/course.controller.js";
import moduleController from "../controllers/module.controller.js";

const courseRouter = Router();

courseRouter.get("/", courseController.getAllCourses);
courseRouter.get("/:courseId", courseController.getCourse);
courseRouter.get("/:courseId/modules", moduleController.getModulesForCourse);

export default courseRouter;
