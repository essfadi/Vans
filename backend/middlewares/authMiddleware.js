const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protected = asyncHandler(async (req, res, next) => {
  let token;
  let decoded;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Please, Authenticate firstly..." });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, msg: "Not authorized to access this route" });
  }
  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: "No token provided..." });
  }
});

module.exports = {
  protected,
};
