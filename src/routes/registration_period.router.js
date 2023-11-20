import { Router } from "express";
import registrationPeriodController from "../controllers/registration_period.controller.js";

const registrationPeriodRouter = Router();

registrationPeriodRouter.use(
  "/",
  registrationPeriodController.getRegistrationPeriods
);
registrationPeriodRouter.use(
  "/:periodId",
  registrationPeriodController.getRegistrationPeriod
);

export default registrationPeriodRouter;
