const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    roomAvailableCount: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

hospitalSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('Hospital', hospitalSchema);
