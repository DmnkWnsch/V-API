/**
 * Controller for the registrations
 * @module controller/registrations
 */

import registrationService from "../services/registration.service.js";

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

  if (!payload.member_id || !payload.exam_plan_id || !payload.status) {
    res.status(400).send({
      message:
        "One of the keys is missing or empty: 'member_id', 'exam_plan_id', 'status'",
    });
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
    res.status(error?.status || 500).send({ message: error?.message || error });
  }
};

export default {
  getRegistrationsForMember,
  addRegistration,
};
