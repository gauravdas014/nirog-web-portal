const Vaccine = require('../models/vaccineModel');

exports.addVaccine = async (req, res) => {
  try {
    const newVaccine = await Vaccine.create(req.body);
    res.status(201).json({
      status: 'success',
      vaccine: newVaccine,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllVaccines = async (req, res) => {
  try {
    const vaccines = await Vaccine.find();
    res.status(200).json({
      status: 'success',
      vaccines,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getVaccine = async (req, res) => {
  try {
    const vaccine = await Vaccine.findById(req.params.vaccineId);
    res.status(200).json({
      status: 'success',
      vaccine,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.editVaccine = async (req, res) => {
  try {
    const updatedVaccine = await Vaccine.findByIdAndUpdate(
      req.params.vaccineId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      vaccine: updatedVaccine,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
