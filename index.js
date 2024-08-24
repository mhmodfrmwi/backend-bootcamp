const express = require("express");
const app = express();
const { body } = require("express-validator");
const coursesRouters = require("./routes/coursesRoutes");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://mahmoudelframawi35:eJ8PlurRoltfIzhO@cluster0.regix0k.mongodb.net/codeZone?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("connected to db"));
app.use(express.json());
app.use("/api", coursesRouters);
app.listen(3000);
