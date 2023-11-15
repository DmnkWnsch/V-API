const getAllCourses = (req, res) => {
  res.send({ test: "Get all modules" });
};

const getCourse = (req, res) => {
  console.log(req);
  res.send({ moduleId: req.params.moduleId });
};

export default {
  getAllCourses,
  getCourse,
};
