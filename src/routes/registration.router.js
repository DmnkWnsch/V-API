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
 * @bodyparam {Boolean} admin - whatever to skip time constraints for regs or not
 */
registrationRouter.post("/", registrationController.addRegistration);

/**
 * Route for getting registrations for a given member id
 * @name GET /
 * @routeparam {Integer} memberId - the id of the member
 */
registrationRouter.get(
  "/:memberId",
  registrationController.getRegistrationsForMember
);

/**
 * Route for deleting a registration
 * @name DELETE /
 * @bodyparam {Integer} member_id - the id of the member
 * @bodyparam {Integer} exam_plan_id - the id of the planned exam
 * @bodyparam {Boolean} admin - whatever to skip time constraints for deletion or not
 */
registrationRouter.delete("/", registrationController.deleteRegistration);

/**
 * Route for updating a registration
 * @name PATCH /
 * @bodyparam {Integer} member_id - the id of the member
 * @bodyparam {Integer} exam_plan_id - the id of the planned exam
 * @bodyparam {String} status - the new state of the registration
 */
registrationRouter.patch("/", registrationController.updateRegistrationState);

export default registrationRouter;
