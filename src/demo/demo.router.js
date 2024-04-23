/**
 * The router for the demo methods
 * @module demo/router
 */

import { Router } from "express";
import demoController from "./demo.controller.js";

const demoRouter = Router();

/**
 * The route for getting the demo member id
 * @name GET /
 */
demoRouter.get("/", demoController.getMemberId);

/**
 * The route for updating the demo member id
 * @name PATCH /
 * @routeparam {Integer} member_id - the new id of the demo member
 */
demoRouter.patch("/", demoController.updateMemberId);

export default demoRouter;
