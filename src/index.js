import express, { json } from "express";
import moduleRouter from "./routes/module.routes.js";
import courseRouter from "./routes/course.router.js";

const app = express();
app.use(json());

app.use("/modules", moduleRouter);
app.use("/courses", courseRouter);

app.listen(3210, () => {
  console.log("Server is online");
});
