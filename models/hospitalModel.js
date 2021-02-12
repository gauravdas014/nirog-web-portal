const mongoose = require('mongoose');

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

module.exports = mongoose.model('Hospital', hospitalSchema);
