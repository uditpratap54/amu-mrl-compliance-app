// server/models/Farmer.js
// Farmer schema: {name, phone, address, farmId}

const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    farmId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Farmer', farmerSchema);
