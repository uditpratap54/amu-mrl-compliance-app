// server/models/Livestock.js
// Livestock schema: {tagId, species, breed, age, weight, farmerId, status}

const mongoose = require('mongoose');

const livestockSchema = new mongoose.Schema(
  {
    tagId: { type: String, required: true, unique: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true, min: 0 },
    weight: { type: Number, required: true, min: 0 },
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
    status: { type: String, required: true, enum: ['active', 'sold', 'deceased', 'quarantined'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Livestock', livestockSchema);
