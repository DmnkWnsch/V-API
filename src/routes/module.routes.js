import { Router } from "express";
import moduleController from "../controllers/module.controller.js";
import examController from "../controllers/exam.controller.js";

const moduleRouter = Router();

moduleRouter.get("/", moduleController.getAllModules);
moduleRouter.get("/:moduleId", moduleController.getModule);
moduleRouter.get("/:moduleId/exams", examController.getExamsForModule);

export default moduleRouter;
