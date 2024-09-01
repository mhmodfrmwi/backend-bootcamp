const jwt = require("jsonwebtoken");
const allowedTo = (...roles) => {
  return (req, res, next) => {
    const authorization =
      req.headers["Authorization"] || req.headers["authorization"];
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!roles.includes(decoded.role)) {
      res.status(500).json({
        status: "fail",
        messege: "you are not able to make this action",
      });
    }
    next();
  };
};
module.exports = allowedTo;
