import { Router } from "express";
import registrationController from "../controllers/registration.controller.js";

const memberRouter = Router();

memberRouter.get(
  "/:memberId/registrations",
  registrationController.getRegistrationsForMember
);

export default memberRouter;
