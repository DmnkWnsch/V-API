/**
 * The router for the planned-exams route
 * @module routers/planned-exams
 */

import { Router } from "express";
import plannedExamsController from "../controllers/planned_exams.controller.js";
import examinerController from "../controllers/examiner.controller.js";

const plannedExamsRouter = Router();

/**
 * Route for getting all planned exams
 * @name GET /
 */
plannedExamsRouter.get("/", plannedExamsController.getPlannedExams);

/**
 * Route for getting all examiners for a planned exam
 * @name GET /:examPlanId/examiners
 * @routeparam {Ineteger} examPlanId - the id of the exam in the exam plan
 */
plannedExamsRouter.get(
  "/:examPlanId/examiners",
  examinerController.getExaminersForExam
);

export default plannedExamsRouter;
