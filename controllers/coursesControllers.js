const { validationResult } = require("express-validator");
const Course = require("../models/courses.model");
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const AppError = require("../utils/appError");

const getAllCourses = asyncWrapper(async (req, res) => {
  const { limit, page } = req.query;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.status(200).json({
    status: "sucsess",
    data: {
      courses,
    },
  });
});

const getCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  if (!course) {
    return next(AppError.create("Course not found", 404, "fail"));
  }
  res.status(200).json({ status: "success", data: { course } });
});

const addCourse = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "error", errors: errors.array() });
  }
  const course = new Course(req.body);
  await course.save();
  res.status(201).json({ status: "success", data: { course } });
});

const updateCourse = asyncWrapper(async (req, res) => {
  const courseId = req.params.courseId;
  const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedCourse) {
    return res.status(404).json({ status: "fail", data: "Course not found" });
  }
  res.status(200).json({ status: "success", data: { updatedCourse } });
});

const deleteCourse = asyncWrapper(async (req, res) => {
  const courseId = req.params.courseId;

  const deletedCourse = await Course.findByIdAndDelete(courseId);
  if (!deletedCourse) {
    return res.status(404).json({ status: "fail", data: "Course not found" });
  }
  res.status(200).json({ message: "Course deleted successfully", data: null });
});

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
