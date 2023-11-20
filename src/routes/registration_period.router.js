/**
 * The router for the registration-periods route
 * @module routers/registration-periods
 */

import { Router } from "express";
import registrationPeriodController from "../controllers/registration_period.controller.js";

const registrationPeriodRouter = Router();

/**
 * Route for getting all registration periods
 * @name GET /
 */
registrationPeriodRouter.use(
  "/",
  registrationPeriodController.getRegistrationPeriods
);

/**
 * Route for getting a specific registration period
 * @name GET /:periodId
 * @routeparam {Integer} periodId - the period to get information for
 */
registrationPeriodRouter.use(
  "/:periodId",
  registrationPeriodController.getRegistrationPeriod
);

export default registrationPeriodRouter;
