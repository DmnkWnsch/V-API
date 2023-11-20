import { Router } from "express";
import plannedExamsController from "../controllers/planned_exams.controller.js";

const plannedExamsRouter = Router();

plannedExamsRouter.get("/", plannedExamsController.getPlannedExams);

export default plannedExamsRouter;
