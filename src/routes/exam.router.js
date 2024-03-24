/**
 * The router for the exams route
 * @module routers/exams
 */

import { Router } from "express";
import examController from "../controllers/exam.controller.js";
import planned_examsController from "../controllers/planned_exams.controller.js";

const examRouter = Router();

/**
 * Route for getting all exams
 * @name GET /
 */
examRouter.get("/", examController.getAllExams);

/**
 * Route for adding an exam
 * @name POST /
 * @bodyparam {Integer} module_id - the id of the module
 * @bodyparam {Integer} type - the type of the exam
 */
examRouter.post("/", examController.addExam);

/**
 * Route for getting planned exams for a given exam id
 * @name GET /:examId/planned-exams
 */
examRouter.get(
  "/:examId/planned-exams",
  planned_examsController.getPlannedExamsById
);

export default examRouter;
