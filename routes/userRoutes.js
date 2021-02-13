const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.route('/:userId').get(userController.getUser);
router.route('/:userId').post(userController.editUser);

router.route('/signup').post(userController.signup);

router.route('/login').post(userController.login);

router.route('/baby/register/:userId').post(userController.registerBaby);

router.route('/baby/:babyId').post(userController.editBabyDetails);

module.exports = router;
