/**
 * Controller for the registrations
 * @module controller/registrations
 */

import registrationService from "../services/registration.service.js";

/**
 * Gets all exams a given member is currently registered for
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

export default {
  getRegistrationsForMember,
};
