import examService from "../services/exam.service.js";

const getAllExams = async (req, res) => {
  const exams = await examService.getAllExams();
  res.json(exams);
};

const getExamsForModule = async (req, res) => {
  const moduleId = req.params.moduleId;
  const exams = await examService.getExamsForModule(moduleId);
  res.json(exams);
};

export default {
  getAllExams,
  getExamsForModule,
};
