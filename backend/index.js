const express = require("express");
const router = require("./routes/route");
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());

app.use("/", router);

connectDB();

app.listen(port, () => {
  console.log(`Server started on port, ${port}`);
});
