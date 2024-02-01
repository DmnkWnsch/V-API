/**
 * The router for the exams route
 * @module routers/results
 */

import { Router } from "express";
import resultController from "../controllers/result.controller.js";

const resultsRouter = Router();

/**
 * Route for adding a new result
 * @name POST /
 * @bodyparam {Integer} member_id - the id of the member
 * @bodyparam {Integer} module_id - the id of the module
 * @bodyparam {Integer} exam_id - the id of the exam
 * @bodyparam {Decimal} grade - the exams grade
 * @bodyparam {String} term - the term of the exam
 */
resultsRouter.post("/", resultController.addNewResult);

export default resultsRouter;
