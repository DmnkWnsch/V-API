/**
 * Utility to work with responses
 * @module utils/responses
 */

/**
 * Sends a response with all expected parameters
 * @function
 * @param {Object} response - the express response object
 * @param Array[String] params - list of expected parameters
 */
const sendMissingParamsResponse = (response, params) => {
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

const sendMissingRouteParamsResponse = (response, params) => {
  let missingParams = "";
  params.forEach((item, index) => {
    if (index !== 0) {
      missingParams += ", ";
    }
    missingParams += `'${item}'`;
  });

  response.status(400).send({
    message: `One of the following route parameters is missing: ${missingParams}`,
  });
};

/**
 * Sends a response for an error that occured
 * @function
 * @param {Object} response - the express response object
 * @param {Object} error - the error from a catch block
 */
const sendDefaultErrorResponse = (response, error) => {
  response
    .status(error?.status || 500)
    .send({ message: error?.message || error });
};

export default {
  sendMissingParamsResponse,
  sendMissingRouteParamsResponse,
  sendDefaultErrorResponse,
};
