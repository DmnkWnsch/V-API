/**
 * Controller for the demo member
 * @module demo/controller
 */

import responseUtil from "../util/response.util.js";
import demoService from "./demo.service.js";

/**
 * Gets the current demo member id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getMemberId = async (req, res) => {
  const result = await demoService.getMemberId();

  res.status(200).send({ data: result });
};

/**
 * Updates the demo member id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateMemberId = async (req, res) => {
  const newMemberId = req.body.member_id;

  if (!newMemberId) {
    responseUtil.sendMissingParamsResponse(res, ["member_id"]);
    return;
  }

  try {
    const updated = await demoService.updateMemberId(newMemberId);
    res.status(200).send({ data: updated });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getMemberId,
  updateMemberId,
};
