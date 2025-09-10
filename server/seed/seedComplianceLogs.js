// server/seed/seedComplianceLogs.js

require('dotenv').config();
const mongoose = require('mongoose');
const ComplianceLog = require('../models/ComplianceLog');
const AMUEvent = require('../models/AMUEvent');

async function seedComplianceLogs() {
  const MONGO_URI = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/amu_mrl';
  await mongoose.connect(MONGO_URI);

  await ComplianceLog.deleteMany({});

  const events = await AMUEvent.find();

  const logs = [
    {
      eventRef: events[0]._id,
      ruleFlags: ['OVERDOSE'],
      modelScore: 0.75,
    },
    {
      eventRef: events[1]._id,
      ruleFlags: [],
      modelScore: 0.10,
    },
  ];

  await ComplianceLog.insertMany(logs);
  console.log('Compliance Logs seeded');
  await mongoose.disconnect();
}

seedComplianceLogs().catch(console.error);
