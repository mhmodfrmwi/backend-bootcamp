const express = require("express");
const multer = require("multer");

const route = express.Router();
route.use(express.json());
const usersControllers = require("../controllers/usersControllers");
const AppError = require("../utils/appError");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}.${file.mimetype.split("/")[1]}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] !== "image") {
    cb(AppError.create("please upload an image", 500, "fail"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
route.get("/", usersControllers.getAllUsers);
route.post("/register", upload.single("avatar"), usersControllers.register);
route.post("/login", usersControllers.login);
module.exports = route;
