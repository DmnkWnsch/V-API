import moduleService from "../services/module.service.js";

const getAllModules = (req, res) => {
  res.send({ test: "Get all modules" });
};

const getModule = (req, res) => {
  console.log(req);
  res.send({ moduleId: req.params.moduleId });
};

const getModulesForCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const modules = await moduleService.getModulesForCourse(courseId);
  res.json(modules);
};

export default {
  getAllModules,
  getModule,
  getModulesForCourse,
};
