import { Router } from "express";
import plannedExamsController from "../controllers/planned_exams.controller.js";
import examinerController from "../controllers/examiner.controller.js";

const plannedExamsRouter = Router();

plannedExamsRouter.get("/", plannedExamsController.getPlannedExams);
plannedExamsRouter.get(
  "/:examPlanId/examiners",
  examinerController.getExaminersForExam
);

export default plannedExamsRouter;
