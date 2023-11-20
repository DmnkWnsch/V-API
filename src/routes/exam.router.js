import { Router } from "express";
import examController from "../controllers/exam.controller.js";

const examRouter = Router();

examRouter.get("/", examController.getAllExams);

export default examRouter;
