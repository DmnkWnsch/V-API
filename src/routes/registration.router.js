/**
 * The router for the registrations route
 * @module routers/registrations
 */

import { Router } from "express";
import registrationController from "../controllers/registration.controller.js";

const registrationRouter = Router();

/**
 * Route for creating a new module
 * @name POST /
 * @bodyparam {Integer} member_id - the id of the member
 * @bodyparam {Integer} exam_plan_id - the id of the planned exam
 * @bodyparam {String} status - the status of the registration
 */
registrationRouter.post("/", registrationController.addRegistration);

export default registrationRouter;
