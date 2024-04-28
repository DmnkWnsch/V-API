/**
 * The router for the planned-exams route
 * @module routers/planned-exams
 */

import { Router } from "express";
import plannedExamsController from "../controllers/planned_exams.controller.js";
import examinerController from "../controllers/examiner.controller.js";
import registrationController from "../controllers/registration.controller.js";

const plannedExamsRouter = Router();

/**
 * Route for getting all planned exams
 * @name GET /
 */
plannedExamsRouter.get("/", plannedExamsController.getPlannedExams);

/**
 * Route for getting all examiners for a planned exam
 * @name GET /:examPlanId/examiners
 * @routeparam {Integer} examPlanId - the id of the exam in the exam plan
 */
plannedExamsRouter.get(
  "/:examPlanId/examiners",
  examinerController.getExaminersForExam
);

/**
 * Route for getting all registrations for a planned exam
 * @name GET /:examPlanId/registrations
 * @routeparam {Integer} examPlanId - the id of the exam in the exam plan
 */
plannedExamsRouter.get(
  "/:examPlanId/registrations",
  registrationController.getRegistrationsForPlannedExam
);

/**
 * Route for creating a new module
 * @name POST /
 * @bodyparam {Integer} exam_id - the id of the exam
 * @bodyparam {Date} date - the date when the exam takes place
 * @bodyparam {Integer} register_period_id - the id of the registration period
 */
plannedExamsRouter.post("/", plannedExamsController.addPlannedExam);

/**
 * Route for deleting a planned exam
 * @name DELETE /
 * @bodyparam {Integer} plan_id - the id of the exam
 */
plannedExamsRouter.delete("/", plannedExamsController.deletePlannedExam);

/**
 * Route for updating the date of a planned exam
 * @name PATCH /
 * @bodyparam {Integer} plan_id - the id of the exam
 * @bodyparam {Date} date - the date of the exam
 */
plannedExamsRouter.patch("/", plannedExamsController.updatePlannedExam);

export default plannedExamsRouter;
