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

/**
 * Route for creating a new module
 * @name POST /
 * @bodyparam {Integer} exam_id - the id of the exam
 * @bodyparam {Date} date - the date when the exam takes place
 * @bodyparam {Integer} register_period_id - the id of the registration period
 */
plannedExamsRouter.post("/", plannedExamsController.addPlannedExam);

export default plannedExamsRouter;
