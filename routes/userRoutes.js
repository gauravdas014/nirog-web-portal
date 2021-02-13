const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.route('/:userId').get(userController.getUser);
router.route('/:userId').post(userController.editUser);

router.route('/signup').post(userController.signup);

router.route('/login').post(userController.login);

module.exports = router;
