/**
 * Controller for the member route
 * @module controllers/members
 */

import memberService from "../services/member.service.js";
import paramsUtil from "../util/params.util.js";
import responseUtil from "../util/response.util.js";

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

const addMember = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["name", "last_name", "role"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  const newMember = {
    name: payload.name,
    lastName: payload.last_name,
    role: payload.role,
  };

  try {
    const addedMember = await memberService.addMember(newMember);
    res.status(201).send({ data: addedMember });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getAllMembers,
  getMember,
  addMember,
};
