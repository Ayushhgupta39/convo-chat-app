const express = require("express");
const router = require("./routes/route");
require("dotenv").config();
const port = process.env.PORT;

const app = express();

app.use("/", router);

app.listen(port, () => {
  console.log(`Server started on port, ${port}`);
});
