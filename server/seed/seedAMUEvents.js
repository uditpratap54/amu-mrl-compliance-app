// server/seed/seedAMUEvents.js

require('dotenv').config();
const mongoose = require('mongoose');
const AMUEvent = require('../models/AMUEvent');

async function seedAMUEvents() {
  const MONGO_URI = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/amu_mrl';
  await mongoose.connect(MONGO_URI);

  await AMUEvent.deleteMany({});

  const amuEvents = [
    {
      animalTagId: 'TAG001',
      medicineCode: 'MED001',
      doseMgPerKg: 5,
      route: 'oral',
      date: new Date('2025-08-10'),
      prescriber: 'Vet John',
      notes: 'Routine treatment',
    },
    {
      animalTagId: 'TAG002',
      medicineCode: 'MED002',
      doseMgPerKg: 10,
      route: 'injection',
      date: new Date('2025-08-15'),
      prescriber: 'Vet Jane',
      notes: 'Follow-up',
    },
  ];

  await AMUEvent.insertMany(amuEvents);
  console.log('AMU Events seeded');
  await mongoose.disconnect();
}

seedAMUEvents().catch(console.error);
