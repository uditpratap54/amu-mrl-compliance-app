// server/models/ComplianceLog.js
// ComplianceLog schema: {eventRef, ruleFlags, modelScore}

const mongoose = require('mongoose');

const complianceLogSchema = new mongoose.Schema(
  {
    eventRef: { type: mongoose.Schema.Types.ObjectId, ref: 'AMUEvent', required: true, unique: true },
    ruleFlags: [{ type: String }],
    modelScore: { type: Number, min: 0, max: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ComplianceLog', complianceLogSchema);
