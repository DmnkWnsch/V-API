/**
 * Controller for the results
 * @module controller/results
 */

import resultService from "../services/result.service.js";

/**
 * Gets all results a given member has
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.memberId - the id of the member
 */
const getResultsForMember = async (req, res) => {
  const memberId = req.params.memberId;
  const result = await resultService.getResultsForMember(memberId);

  res.json(result);
};

export default {
  getResultsForMember,
};
