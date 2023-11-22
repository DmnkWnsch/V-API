import express, { json } from "express";
import moduleRouter from "./routes/module.routes.js";
import courseRouter from "./routes/course.router.js";
import examRouter from "./routes/exam.router.js";
import memberRouter from "./routes/member.router.js";
import plannedExamsRouter from "./routes/planned_exams.router.js";
import registrationPeriodRouter from "./routes/registration_period.router.js";
import bodyParser from "body-parser";
import moduleTypesRouter from "./routes/module_types.router.js";
import resultsRouter from "./routes/result.router.js";
import examinersRouter from "./routes/examiners.router.js";

const app = express();
app.use(json());
app.use(bodyParser.json());

app.use("/modules", moduleRouter);
app.use("/courses", courseRouter);
app.use("/exams", examRouter);
app.use("/members", memberRouter);
app.use("/planned-exams", plannedExamsRouter);
app.use("/registration-periods", registrationPeriodRouter);
app.use("/module-types", moduleTypesRouter);
app.use("/results", resultsRouter);
app.use("/examiners", examinersRouter);

app.listen(3210, () => {
  console.log("Server is online");
});
