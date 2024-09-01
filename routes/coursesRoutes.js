const express = require("express");
const route = express.Router();
route.use(express.json());

const coursesController = require("../controllers/coursesControllers");
const { body } = require("express-validator");
const verifyToken = require("../middlewares/verifyToken");
const roles = require("../utils/roles");
const allowedTo = require("../middlewares/allowedTo");
route.get(
  "/",
  verifyToken,
  allowedTo(roles.ADMIN, roles.MANAGER),
  coursesController.getAllCourses
);

route.get("/:courseId", coursesController.getCourse);

route.post(
  "/",
  body("title").notEmpty().withMessage("title is empty"),
  body("price").notEmpty().withMessage("price is empty"),
  coursesController.addCourse
);
route.put("/:courseId", coursesController.updateCourse);

route.delete("/:courseId", coursesController.deleteCourse);
module.exports = route;
