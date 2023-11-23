/**
 * Controller for the registrations
 * @module controller/registrations
 */

import registrationService from "../services/registration.service.js";
import paramsUtil from "../util/params.util.js";
import responseUtil from "../util/response.util.js";

/**
 * Gets all exams a given member is currently registered for
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.memberId - the id for the member
 */
const getRegistrationsForMember = async (req, res) => {
  const memberId = req.params.memberId;
  const registrations = await registrationService.getRegistrationsForMember(
    memberId
  );
  res.json(registrations);
};

/**
 * Adds a new registration
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the registration to add
 */

const addRegistration = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["member_id", "exam_plan_id", "status"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  const newRegistration = {
    memberId: payload.member_id,
    examPlanId: payload.exam_plan_id,
    status: payload.status,
  };

  try {
    const addedRegistration = await registrationService.addRegistration(
      newRegistration
    );
    res.status(201).send({ data: addedRegistration });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getRegistrationsForMember,
  addRegistration,
};
