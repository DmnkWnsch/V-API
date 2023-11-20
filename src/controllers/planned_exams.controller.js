import plannedExamsService from "../services/planned_exams.service.js";

const getPlannedExams = async (req, res) => {
  const result = await plannedExamsService.getPlannedExams();
  res.json(result);
};

export default {
  getPlannedExams,
};
