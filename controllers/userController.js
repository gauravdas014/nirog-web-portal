const User = require('../models/userModel');
const Baby = require('../models/babyModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  user.token = token;
  await user.save();
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    user,
  });
};

exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already registered!',
      });
    }
    const newUser = await User.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
    });
    newUser.password = await bcrypt.hash(req.body.password, 12);
    await newUser.save();
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (
      !user ||
      !(await user.correctPassword(req.body.password, user.password))
    ) {
      res.send('Email or password is incorrect');
    }
    createSendToken(user, 200, req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.registerBaby = async (req, res) => {
  try {
    const newBaby = await Baby.create({
      name: req.body.name,
      age: req.body.age,
      parent: req.params.userId,
      motherName: req.body.motherName,
      fatherName: req.body.fatherName,
      dateOfBirth: req.body.dateOfBirth,
      monthOfBirth: req.body.monthOfBirth,
      yearOfBirth: req.body.yearOfBirth,
    });
    res.status(201).json({
      status: 'success',
      baby: newBaby,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getBabyDetails = async (req, res) => {
  try {
    const baby = await Baby.findOne({ parent: req.params.parentId });
    res.status(200).json({
      status: 'success',
      baby,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.editBabyDetails = async (req, res) => {
  try {
    const updatedBaby = await Baby.findByIdAndUpdate(
      req.params.babyId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      baby: updatedBaby,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
