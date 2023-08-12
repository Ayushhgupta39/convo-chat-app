const express = require("express");
const router = require("./routes/route");
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const connectDB = require("./config/db");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());

app.use(express.json()); // To accept json data.

app.use("/", router);
app.use("/chats/", chatRoutes); 

connectDB();

app.listen(port, () => {
  console.log(`Server started on port, ${port}`);
});
