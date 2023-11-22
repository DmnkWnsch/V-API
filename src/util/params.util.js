const allParametersSet = (payload, params) => {
  let allParamsSet = true;

  params.forEach((item) => {
    if (!payload[item]) {
      allParamsSet = false;
    }
  });

  return allParamsSet;
};

export default {
  allParametersSet,
};
