const express = require('express');
const router = express.Router();

const {createSchedule, getAllSchedules, getScheduleByStartDateTime} = require('../controllers/scheduleController');
const {protected} = require('../middlewares/authMiddleware');
const {roleMiddleware} = require('../middlewares/roleMiddleware');

router.route('/').post(protected, roleMiddleware, createSchedule).get(protected, getAllSchedules);
router.route('/:startDateTime').get(protected, getScheduleByStartDateTime);
// Still we can add more routes here such as Update and Delete

module.exports = router;