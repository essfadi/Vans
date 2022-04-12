const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

//@desc    Regsiter new User
//@route   POST /api/user/register
//@access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields that are required",
    });
  }
  // Checking for registered users
  const UserExists = await User.findOne({ email });
  if (UserExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create new user/driver/admin
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: email === process.env.ADMIN_EMAIL ? "admin" : "user",
  });
  if (user) {
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    throw new Error("User not created, invalid data!");
  }
});

//@desc    Login User
//@route   POST /api/user/
//@access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compareSync(password, user.password))) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      message: "User logged in successfully",
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }
});

// Generating of Tokens using JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc    Get users' profile
// @route   GET /api/user/mydata
// @access  Private
const getData = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ user: req.user, message: "User data fetched successfully" });
});

// @desc    Get All Users
// @route   GET /api/user/
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users, message: "Users fetched successfully" });
});

//@desc Create Driver
//@route  POST /api/driver/
//@access Private
const createDriver = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields that are required",
    });
  }
  // Checking for registered users
  const UserExists = await User.findOne({ email });
  if (UserExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const driver = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "driver",
  });
  if (driver) {
    res.status(200).json({
      success: true,
      message: "Driver created successfully",
      id: driver.id,
      name: driver.name,
      email: driver.email,
      role: driver.role,
      token: generateToken(driver.id),
    });
  } else {
    throw new Error("Driver not created, invalid data!");
  }
});

module.exports = {
  registerUser,
  loginUser,
  getData,
  getAllUsers,
  createDriver,
};
