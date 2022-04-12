const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getData, getAllUsers, createDriver, getDriverSchedule} = require('../controllers/userController'); 

//It should be protected
const {protected} = require('../middlewares/authMiddleware');
const {adminMiddleware, driverMiddleware} = require('../middlewares/rolesMiddleware');

router.route('/').post(loginUser).get(protected, adminMiddleware, getAllUsers);
router.post('/register', registerUser);
router.get('/mydata', protected, getData);
router.post('/driver', protected, adminMiddleware, createDriver);
router.get('/driver/schedule', protected, driverMiddleware, getDriverSchedule);

module.exports = router;