const { default: mongoose } = require("mongoose");
const roles = require("../utils/roles");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // validate: [validator.isEmail, "enter a valide email"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [roles.ADMIN, roles.MANAGER, roles.USER],
    default: roles.USER,
  },
  avatar: {
    type: String,
    default: "uploads/defaultAvatar.webp",
  },
});
module.exports = mongoose.model("User", userSchema);
