const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const adminMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this route",
    });
  }
});
const driverMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user.role === "driver") {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to access this route",
    });
  }
});

module.exports = {
  adminMiddleware,
  driverMiddleware,
  
};
