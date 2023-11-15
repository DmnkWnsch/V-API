import { Router } from "express";
import moduleController from "../controllers/module.controller.js";

const moduleRouter = Router();

moduleRouter.get("/", moduleController.getAllModules);
moduleRouter.get("/:moduleId", moduleController.getModule);

export default moduleRouter;
