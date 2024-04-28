/**
 * Controller for the registrations
 * @module controller/registrations
 */

import examService from "../services/exam.service.js";
import planned_examsService from "../services/planned_exams.service.js";
import registrationService from "../services/registration.service.js";
import registration_periodService from "../services/registration_period.service.js";
import resultService from "../services/result.service.js";
import dateUtil from "../util/date.util.js";
import paramsUtil from "../util/params.util.js";
import responseUtil from "../util/response.util.js";

/**
 * Gets all exams a given member is currently registered for
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Integer} req.params.memberId - the id for the member
 */
const getRegistrationsForMember = async (req, res) => {
  const memberId = req.params.memberId;

  try {
    const registrations = await registrationService.getRegistrationsForMember(
      memberId
    );
    res.status(200).send({ data: registrations });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Adds a new registration
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the registration to add
 */
const addRegistration = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["member_id", "exam_plan_id"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  // check if registration is during the registration period
  // skip check if admin is set
  if (!payload.admin) {
    const regPeriod =
      await registration_periodService.getRegistrationPeriodByPlannedExam(
        payload.exam_plan_id
      );

    const period = regPeriod[0];

    if (
      !dateUtil.isDateBetween(new Date(), period.start_date, period.end_date)
    ) {
      responseUtil.sendDefaultErrorResponse(res, {
        status: 400,
        message: "Registrations are only possible during registration periods.",
      });
      return;
    }
  }

  // If the payload doesnt contain a status, check if the exam has
  // tasks, if they are passed => allowed, otherwise conditional
  if (!payload.status) {
    // check if module has tasks exam

    const examsForModule = await examService.getModuleExamsByPlannedExam(
      payload.exam_plan_id
    );

    let tasksId = -1;
    let moduleId = -1;
    examsForModule.forEach((exam) => {
      if (exam.type == "TASKS") {
        tasksId = exam.id;
        moduleId = exam.module_id;
      }
    });

    if (tasksId == -1) {
      payload.status = "ALLOWED";
    } else {
      const results = await resultService.getResult(
        payload.member_id,
        moduleId,
        tasksId
      );

      let passedTasks = false;

      results.forEach((result) => {
        if (result.status == "PASSED") {
          passedTasks = true;
        }
      });

      // if the member passed the tasks already, we can set the status to allowed
      payload.status = passedTasks ? "ALLOWED" : "CONDITIONAL";
    }
  }

  const newRegistration = {
    memberId: payload.member_id,
    examPlanId: payload.exam_plan_id,
    status: payload.status,
  };

  try {
    const addedRegistration = await registrationService.addRegistration(
      newRegistration
    );
    res.status(201).send({ data: addedRegistration });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Deletes a registration
 * If payload contains "admin", check if exam is in the next 7 days is skipped
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the registration to delete
 */
const deleteRegistration = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["member_id", "exam_plan_id"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  if (!payload.admin) {
    // if the deletion wasnt done by an admin, check if
    // deletion is still possible (7 days before exam)
    const plannedExamDB = await planned_examsService.getPlannedExamByUID(
      payload.exam_plan_id
    );

    const plannedExam = plannedExamDB[0];

    if (plannedExam) {
      const examDate = plannedExam.date;
      if (dateUtil.isDateInDays(7, examDate)) {
        // exam is in less than 7 days, dont allow deletion
        responseUtil.sendDefaultErrorResponse(res, {
          status: 400,
          message:
            "Unregistering is only allowed until 7 days before the exam.",
        });
        return;
      }
    }
  }

  try {
    const deletedRegistration = await registrationService.deleteRegistration(
      payload.member_id,
      payload.exam_plan_id
    );

    res.status(200).send({ data: deletedRegistration });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Deletes an existing registration
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the registration to delete
 */
const updateRegistrationState = async (req, res) => {
  const payload = req.body;
  const expectedParams = ["member_id", "exam_plan_id", "state"];

  if (!paramsUtil.allParametersSet(payload, expectedParams)) {
    responseUtil.sendMissingParamsResponse(res, expectedParams);
    return;
  }

  try {
    const updatedRegistration =
      await registrationService.updateRegistrationState(
        payload.member_id,
        payload.exam_plan_id,
        payload.state
      );

    res.status(200).send({ data: updatedRegistration });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

/**
 * Gets all registrations for a planned exam
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param req.body - the payload for the registration to delete
 */
const getRegistrationsForPlannedExam = async (req, res) => {
  const plannedExamId = req.params.examPlanId;

  if (!plannedExamId) {
    responseUtil.sendMissingRouteParamsResponse(res, ["examPlanId"]);
    return;
  }

  try {
    const registrations =
      await registrationService.getRegistrationsForPlannedExam(plannedExamId);

    res.status(200).send({ data: registrations });
  } catch (error) {
    responseUtil.sendDefaultErrorResponse(res, error);
  }
};

export default {
  getRegistrationsForMember,
  addRegistration,
  deleteRegistration,
  updateRegistrationState,
  getRegistrationsForPlannedExam,
};
