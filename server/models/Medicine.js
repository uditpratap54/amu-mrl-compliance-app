// server/models/Medicine.js
// Medicine schema: {code, name, atcClass, withdrawalPeriodDays, mrlMgPerKg}

const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    atcClass: { type: String, required: true },
    withdrawalPeriodDays: { type: Number, required: true, min: 0 },
    mrlMgPerKg: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Medicine', medicineSchema);
