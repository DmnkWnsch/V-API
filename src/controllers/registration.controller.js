import registrationService from "../services/registration.service.js";

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
