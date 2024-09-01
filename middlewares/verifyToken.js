const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authorization =
    req.headers["Authorization"] || req.headers["authorization"];
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "invalid or expired token",
    });
  }
};
module.exports = verifyToken;
