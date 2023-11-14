const getAllModules = (req, res) => {
  res.send({ test: "Get all modules" });
};

const getModule = (req, res) => {
  console.log(req);
  res.send({ moduleId: req.params.moduleId });
};

export { getAllModules, getModule };
