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

export default examRouter;
