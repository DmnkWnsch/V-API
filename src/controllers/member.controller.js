/**
 * Controller for the member route
 * @module controllers/members
 */

import memberService from "../services/member.service.js";

/**
 * Gets all members
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllMembers = async (req, res) => {
  const result = await memberService.getAllMembers();
  res.json(result);
};

/**
 * Gets a member with a specific id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.memberId - the member id
 */
const getMember = async (req, res) => {
  const memberId = req.params.memberId;
  const result = await memberService.getMember(memberId);

  res.json(result);
};

export default {
  getAllMembers,
  getMember,
};
