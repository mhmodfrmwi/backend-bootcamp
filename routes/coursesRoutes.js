const express = require("express");
const route = express.Router();
route.use(express.json());
const coursesController = require("../controllers/coursesControllers");
const { body } = require("express-validator");
route.get("/courses", coursesController.getAllCourses);

route.get("/:courseId", coursesController.getCourse);

route.post(
  "/courses",
  body("title").notEmpty().withMessage("title is empty"),
  body("price").notEmpty().withMessage("price is empty"),
  coursesController.addCourse
);
route.put("/:courseId", coursesController.updateCourse);

route.delete("/:courseId", coursesController.deleteCourse);
module.exports = route;
