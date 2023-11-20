import examinerService from "../services/examiner.service.js";

const getExaminersForExam = async (req, res) => {
  const examPlanId = req.params.examPlanId;
  const result = await examinerService.getExaminersForExam(examPlanId);

  res.json(result);
};

export default {
  getExaminersForExam,
};
