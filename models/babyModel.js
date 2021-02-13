const mongoose = require('mongoose');

const babySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  monthOfBirth: {
    type: String,
  },
  yearOfBirth: {
    type: String,
  },
  motherName: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Baby', babySchema);
