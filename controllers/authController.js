const Hospital = require('../models/hospitalModel');
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
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  user.token = token;
  await user.save();
  user.password = undefined;
  res.status(statusCode).render('portal/dashboard');
};

exports.signup = async (req, res) => {
  try {
    const newHospital = await Hospital.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      isApproved: false,
      password: req.body.password,
    });
    newHospital.password = await bcrypt.hash(req.body.password, 12);
    await newHospital.save();
    createSendToken(newHospital, 201, req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ email: req.body.email });
    if (
      !hospital ||
      !(await hospital.correctPassword(req.body.password, hospital.password))
    ) {
      res.send('Email or password is incorrect');
    }
    createSendToken(hospital, 200, req, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.signout = async (req, res) => {
  try {
    res.clearCookie('jwt');
    res.redirect('/');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
