const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getData, getAllUsers, createDriver} = require('../controllers/userController'); 

//It should be protected
const {protected} = require('../middlewares/authMiddleware');
const {roleMiddleware} = require('../middlewares/roleMiddleware');

router.route('/').post(loginUser).get(protected, roleMiddleware, getAllUsers);
router.post('/register', registerUser);
router.get('/mydata', protected, getData);
router.post('/driver', protected, roleMiddleware, createDriver);

module.exports = router;