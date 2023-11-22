const createMissingParamsResponse = (response, params) => {
  let missingParams = "";
  params.forEach((item, index) => {
    if (index !== 0) {
      missingParams += ", ";
    }
    missingParams += `'${item}'`;
  });

  response.status(400).send({
    message: `One of the following keys is missing or empty: ${missingParams}`,
  });
};

const createDefaultErrorErsponse = (response, error) => {
  response
    .status(error?.status || 500)
    .send({ message: error?.message || error });
};

export default {
  createMissingParamsResponse,
  createDefaultErrorErsponse,
};
