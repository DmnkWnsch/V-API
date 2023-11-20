import resultService from "../services/result.service.js";

const getResultsForMember = async (req, res) => {
  const memberId = req.params.memberId;
  const result = await resultService.getResultsForMember(memberId);

  res.json(result);
};

export default {
  getResultsForMember,
};
