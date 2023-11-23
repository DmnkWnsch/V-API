/**
 * The router for the exams route
 * @module routers/exams
 */

import { Router } from "express";
import examController from "../controllers/exam.controller.js";

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

export default examRouter;
