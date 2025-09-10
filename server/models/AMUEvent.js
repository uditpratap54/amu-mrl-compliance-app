// server/models/AMUEvent.js
// AMUEvent schema: {animalTagId, medicineCode, doseMgPerKg, route, date, prescriber, notes}

const mongoose = require('mongoose');

const amuEventSchema = new mongoose.Schema(
  {
    animalTagId: { type: String, required: true },
    medicineCode: { type: String, required: true },
    doseMgPerKg: { type: Number, required: true, min: 0 },
    route: { type: String, required: true },
    date: { type: Date, required: true },
    prescriber: { type: String, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AMUEvent', amuEventSchema);
