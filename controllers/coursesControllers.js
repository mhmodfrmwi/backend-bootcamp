const { courses } = require("../data/courses");
const { body, validationResult } = require("express-validator");
const getCourses = (req, res) => {
  console.log(courses);
  res.json(courses);
};

const getCourse = (req, res) => {
  const courseId = +req.params.courseId;
  const course = courses.find((course) => course.id === courseId);
  console.log(course);
  if (!course) {
    return res.send("course not found").status(404);
  }
  return res.json(course);
};
const addCourse = (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.send(errors);
  }
  courses.push(req.body);
  res.json(courses);
};

const updateCourse = (req, res) => {
  console.log(req.params.courseId);

  const courseId = +req.params.courseId;
  let oldCourse = courses.find((course) => course.id === courseId);
  console.log(oldCourse);

  oldCourse = { ...oldCourse, ...req.body };
  res.send(oldCourse);
};
const deleteCourse = (req, res) => {
  console.log(req.params.courseId);
  res.send(courses.filter((course) => course.id !== +req.params.courseId));
};
module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
