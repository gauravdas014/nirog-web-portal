const Hospital = require('../models/hospitalModel');

// Function to get all hoipital information
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

// Function to get info of a single hospital
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

// Function to edit hospital informaion
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
