import { Router } from "express";
import registrationController from "../controllers/registration.controller.js";
import memberController from "../controllers/member.controller.js";

const memberRouter = Router();

memberRouter.get(
  "/:memberId/registrations",
  registrationController.getRegistrationsForMember
);

memberRouter.get("/", memberController.getAllMembers);
memberRouter.get("/:memberId", memberController.getMember);

export default memberRouter;
