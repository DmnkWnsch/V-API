import database from "../database/database.js";

const getRegistrationPeriods = async () => {
  const result = await database.query("SELECT * FROM register_periods");
  return result;
};

const getRegistrationPeriod = async (periodId) => {
  const result = await database.query(
    "SELECT * FROM register_periods WHERE `id` = ?",
    [periodId]
  );
  return result;
};

export default {
  getRegistrationPeriods,
  getRegistrationPeriod,
};
