import express, { json } from "express";
import moduleRouter from "./routes/module.routes.js";

const app = express();
app.use(json());

app.use("/modules", moduleRouter);

app.listen(3210, () => {
  console.log("Server is online");
});
