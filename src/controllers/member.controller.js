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

/**
 * Adds a new member
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the member to add
 */
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

/**
 * Deletes a member
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.params.memberId - the id of the member to delete
 */
const deleteMember = async (req, res) => {
  const memberId = req.params.memberId;

  try {
    const result = await memberService.deleteMember(memberId);
    res.status(200).send({ deleted: memberId });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Updates a member
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.params.memberId - the id of the member to update
 * @param req.body - the payload for the member
 */
const updateMember = async (req, res) => {
  const memberId = req.params.memberId;
  const payload = req.body;
  const expectedParams = ["name", "last_name", "role"];

  if (!memberId) {
    responseUtil.sendMissingParamsResponse(res, ["memberId"]);
    return;
  }

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  const memberData = {
    id: memberId,
    name: payload.name,
    lastName: payload.last_name,
    role: payload.role,
  };

  try {
    const updatedMember = await memberService.updateMember(memberData);
    res.status(200).send({ data: updatedMember });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getAllMembers,
  getMember,
  addMember,
  deleteMember,
  updateMember,
};
