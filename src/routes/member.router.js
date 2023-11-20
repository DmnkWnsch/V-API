/**
 * The router for the members route
 * @module routers/members
 */

import { Router } from "express";
import registrationController from "../controllers/registration.controller.js";
import memberController from "../controllers/member.controller.js";
import resultController from "../controllers/result.controller.js";

const memberRouter = Router();

/**
 * The route for getting all members
 * @name GET /
 */
memberRouter.get("/", memberController.getAllMembers);

/**
 * Route for getting a specific member
 * @name GET /:memberId
 * @routeparam {Integer} memberId - the id of the member to get
 */
memberRouter.get("/:memberId", memberController.getMember);

/**
 * Route for getting all exam registrations for a specific member
 * @name GET /:memberId/registrations
 * @routeparam {Integer} memberId - the id of the member to get
 */
memberRouter.get(
  "/:memberId/registrations",
  registrationController.getRegistrationsForMember
);

/**
 * Route for getting all exam results of a specific member
 * @name GET /:memberId/results
 * @routeparam {Integer} memberId - the id of the member to get
 */
memberRouter.get("/:memberId/results", resultController.getResultsForMember);

export default memberRouter;
