const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    whenToGive: {
      type: String,
    },
    dose: {
      type: String,
    },
    smallDescription: {
      type: String,
    },
    description: {
      type: String,
    },
    route: {
      type: String,
    },
    site: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Vaccine', vaccineSchema);
