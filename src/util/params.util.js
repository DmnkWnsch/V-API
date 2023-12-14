/**
 * Utility to work with parameters
 * @module utils/parameters
 */

/**
 * Checks if all expected parameters are set in a payload
 * @function
 * @param {Object} payload - the payload to check
 * @param Array[String] params - an array of the expected parameters
 * @returns {Boolean} Whatever all params are set or not
 */
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
