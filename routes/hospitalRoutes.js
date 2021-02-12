const express = require('express');
const hospitalController = require('../controllers/hospitalController');
const router = express.Router();

router.route('/all').get(hospitalController.getAllHospitals);
router.route('/:hospitalId').get(hospitalController.getHospital);
router.route('/:hospitalId').post(hospitalController.editHospitalDetails);

module.exports = router;
