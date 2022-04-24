const express = require('express');
const router = express.Router();

const {createSchedule, getAllSchedules, getScheduleByStartDateTime} = require('../controllers/scheduleController');
const {protected} = require('../middlewares/authMiddleware');
const {adminMiddleware} = require('../middlewares/rolesMiddleware');

router.route('/').get(protected, getAllSchedules).post(protected, adminMiddleware, createSchedule);
router.route('/:startDateTime').get(protected, getScheduleByStartDateTime);
// Still we can add more routes here such as Update and Delete

module.exports = router;