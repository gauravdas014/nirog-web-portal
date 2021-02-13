const User = require('../models/userModel');
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

exports.registerBaby = async (req, res) => {
  const baby = await User.create({
    name: req.body.babyName,
    age: req.body.age,
  });
};
