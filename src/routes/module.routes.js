import { Router } from "express";
import { getAllModules, getModule } from "../controllers/module.controller.js";

const moduleRouter = Router();

moduleRouter.get("/", getAllModules);
moduleRouter.get("/:moduleId", getModule);

export default moduleRouter;
