import registrationPeriodService from "../services/registration_period.service.js";

const getRegistrationPeriods = async (req, res) => {
  const result = await registrationPeriodService.getRegistrationPeriods();
  res.json(result);
};

const getRegistrationPeriod = async (req, res) => {
  const periodId = req.params.periodId;
  const result = await registrationPeriodService.getRegistrationPeriod(
    periodId
  );

  res.json(result);
};

export default {
  getRegistrationPeriods,
  getRegistrationPeriod,
};
