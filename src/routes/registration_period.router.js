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
registrationPeriodRouter.get(
  "/",
  registrationPeriodController.getRegistrationPeriods
);

/**
 * Route for getting a specific registration period
 * @name GET /:periodId
 * @routeparam {Integer} periodId - the period to get information for
 */
registrationPeriodRouter.get(
  "/:periodId",
  registrationPeriodController.getRegistrationPeriod
);

/**
 * Route for adding a new registration period
 * @name POST /
 * @bodyparam {String} name - the name of the registration period
 * @bodyparam {Date} start_date - the start date of the period
 * @bodyparam {Date} end_datte - the end date of the period
 */
registrationPeriodRouter.post(
  "/",
  registrationPeriodController.addRegistrationPeriod
);

/**
 * Route for updating a registration period
 * @name PUT /
 * @routeparam {Integer} id - the id of the period
 * @bodyparam {Date} start_date - the start date of the period
 * @bodyparam {Date} end_datte - the end date of the period
 */
registrationPeriodRouter.put(
  "/:periodId",
  registrationPeriodController.updateRegistrationPeriod
);

/**
 * Route for deleting a registration period
 * @name DELETE /
 * @routeparam {Integer} id - the id of the period
 */
registrationPeriodRouter.delete(
  "/:periodId",
  registrationPeriodController.deleteRegistrationPeriod
);

export default registrationPeriodRouter;
