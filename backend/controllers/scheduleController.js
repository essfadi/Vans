const express = require("express");
const asyncHandler = require("express-async-handler");

const scheduleModel = require("../models/scheduleModel");

//@desc   Get all schedules
//@route  GET /api/schedule/
//@access Public
const getAllSchedules = asyncHandler(async (req, res) => {
  const schedules = await scheduleModel.find();
  res.status(200).json({
    success: true,
    data: schedules,
  });
});

//@desc  Get schedule by startDateTime
//@route  GET /api/schedule/:startDateTime
//@access Public
const getScheduleByStartDateTime = asyncHandler(async (req, res) => {
    const { startDateTime } = req.params;
    const schedule = await scheduleModel.findOne({ startDateTime });
    if (!schedule) {
        return res.status(400).json({
            success: false,
            message: "Schedule not found",
        });
    }
    res.status(200).json({
        success: true,
        data: schedule,
    });
});

//@desc Create schedule
//@route  POST /api/schedule/
//@access Private
const createSchedule = asyncHandler(async (req, res) => {
  const {driver, startDateTime, endDateTime, points, numberOfPassengers} = req.body;
  if (!driver || !startDateTime || !endDateTime || !points || !numberOfPassengers) {
    return res.status(400).json({
      success: false,
      message: "Please, provide all required fields",
    });
  }
  const duplicate = await scheduleModel.findOne({ startDateTime });
  if (duplicate) {
    return res.status(400).json({
      success: false,
      message: "Schedule already exists",
    });
  }
  const schedule = await scheduleModel.create({
    startDateTime,
    driver,
    endDateTime,
    points,
    numberOfPassengers,
  });
  if (!schedule) {
    return res.status(400).json({
      success: false,
      message: "Schedule not created",
    });
  }
  res.status(201).json({
    success: true,
    data: schedule,
  });
});

module.exports = {
    getAllSchedules,
    getScheduleByStartDateTime,
    createSchedule,
}
