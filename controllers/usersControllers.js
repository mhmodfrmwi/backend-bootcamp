const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
};
const register = async (req, res) => {
  let { firstName, lastName, email, password, role } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(404).json({
      status: "fail",
      message: "this email is existed",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename,
  });
  const userToken = jwt.sign(
    { email: newUser.email, id: newUser._id, role: newUser.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1m" }
  );
  newUser.token = userToken;
  await newUser.save();
  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "user not found",
    });
  }
  const validePassword = await bcrypt.compare(password, user.password);
  console.log(validePassword);

  if (validePassword !== true) {
    return res.status(500).json({
      status: "fail",
      message: "password is wronge",
    });
  }
  const userToken = jwt.sign(
    { email: user.email, id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1m" }
  );
  user.token = userToken;
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
module.exports = {
  getAllUsers,
  login,
  register,
};
