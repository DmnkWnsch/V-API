import { Router } from "express";
import registrationController from "../controllers/registration.controller.js";
import memberController from "../controllers/member.controller.js";
import resultController from "../controllers/result.controller.js";

const memberRouter = Router();

memberRouter.get("/", memberController.getAllMembers);
memberRouter.get("/:memberId", memberController.getMember);
memberRouter.get(
  "/:memberId/registrations",
  registrationController.getRegistrationsForMember
);
memberRouter.get("/:memberId/results", resultController.getResultsForMember);

export default memberRouter;
