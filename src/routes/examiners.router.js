/**
 * Router for the examiners route
 * @module routers/examiners
 */

import { Router } from "express";
import examinerController from "../controllers/examiner.controller.js";

const examinersRouter = Router();

/**
 * Route for adding a new examiner
 * @name POST /
 * @bodyparam {Integer} exam_plan_id - the id of the exam in the planned exams
 * @bodyparam {Integer} member_id - the id of the examiner member
 */
examinersRouter.post("/", examinerController.addExaminer);

/**
 * Route for deleting an examiner
 * @name DELETE /
 * @bodyparam {Integer} exam_plan_id - the id of the exam in the planned exams
 * @bodyparam {Integer} member_id - the id of the examiner member
 */
examinersRouter.delete("/", examinerController.deleteExaminer);

export default examinersRouter;
