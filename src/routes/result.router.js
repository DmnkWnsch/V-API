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

/**
 * Route for deleting an existing result
 * @name DELETE /
 * @bodyparam {Integer} member_id - the id of the member
 * @bodyparam {Integer} exam_id - the id of the exam
 * @bodyparam {Integer} try - the try
 */
resultsRouter.delete("/", resultController.deleteResult);

/**
 * Route for updating an existing result
 * @name PATCH /
 * @bodyparam {Integer} member_id - the id of the member
 * @bodyparam {Integer} exam_id - the id of the exam
 * @bodyparam {Integer} try - the try
 * @bodyparam {Integer} grade - the new grade
 */
resultsRouter.patch("/", resultController.updateResult);

export default resultsRouter;
