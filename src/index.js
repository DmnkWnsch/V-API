const express = require("express");

const app = express();
app.use(express.json());

app.listen(3210, () => {
  console.log("Server is online");
});

app.get("/test", (request, response) => {
  const status = {
    Status: "Operational1",
  };

  response.send(status);
});
