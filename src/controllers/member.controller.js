import memberService from "../services/member.service.js";

const getAllMembers = async (req, res) => {
  const result = await memberService.getAllMembers();
  res.json(result);
};

const getMember = async (req, res) => {
  const memberId = req.params.memberId;
  const result = await memberService.getMember(memberId);

  res.json(result);
};

export default {
  getAllMembers,
  getMember,
};
