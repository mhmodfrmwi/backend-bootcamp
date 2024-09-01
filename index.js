const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const coursesRouters = require("./routes/coursesRoutes");
const usersRouters = require("./routes/usersRoutes");
const mongoose = require("mongoose");
const mongodbUrl = process.env.MONGODB_URL;
const port = process.env.PORT;
mongoose.connect(mongodbUrl).then(() => console.log("connected to db"));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});
app.use("/api/courses", coursesRouters);
app.use("/api/users", usersRouters);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// global route handler
app.all("*", (req, res) => {
  res.status(404).json({ status: "error", message: "page not found" });
});

// global error handler

app.use((err, req, res, next) => {
  console.log(err);

  res.status(err.statusCode || 500).json({
    status: err.statusText || "error",
    code: err.statusCode || 500,
    message: err.message || null,
  });
});
app.listen(port);
