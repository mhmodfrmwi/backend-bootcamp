const express = require("express");
const { body } = require("express-validator");
let coursesController = require("../controllers/coursesControllers.js");
const router = express.Router();
router.get("/", coursesController.getCourses);
router.get("/:courseId", coursesController.getCourse);
router.post(
  "/",
  body("title").isLength({ min: 3 }),
  body("price").isNumeric(),
  coursesController.addCourse
);
router.delete("/:courseId", coursesController.deleteCourse);
router.patch(
  "/:courseId",
  body("title").notEmpty(),
  coursesController.updateCourse
);
module.exports = router;
