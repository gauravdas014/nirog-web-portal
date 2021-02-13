const Hospital = require('../models/hospitalModel');

exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find({ isApproved: true });
    res.status(200).json({
      status: 'success',
      hospitals,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.hospitalId);
    res.status(200).json({
      status: 'success',
      hospital,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.editHospitalDetails = async (req, res) => {
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(
      req.params.hospitalId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      updatedHospital,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
