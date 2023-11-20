import express, { json } from "express";
import moduleRouter from "./routes/module.routes.js";
import courseRouter from "./routes/course.router.js";
import examRouter from "./routes/exam.router.js";
import memberRouter from "./routes/member.router.js";

const app = express();
app.use(json());

app.use("/modules", moduleRouter);
app.use("/courses", courseRouter);
app.use("/exams", examRouter);
app.use("/members", memberRouter);

app.listen(3210, () => {
  console.log("Server is online");
});
