// server/seed/seedMedicines.js

require('dotenv').config();
const mongoose = require('mongoose');
const Medicine = require('../models/Medicine');

async function seedMedicines() {
  const MONGO_URI = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/amu_mrl';
  await mongoose.connect(MONGO_URI);

  await Medicine.deleteMany({});

  const medicines = [
    {
      code: 'MED001',
      name: 'Amoxicillin',
      atcClass: 'J01CA',
      withdrawalPeriodDays: 7,
      mrlMgPerKg: 0.1,
    },
    {
      code: 'MED002',
      name: 'Tetracycline',
      atcClass: 'J01AA',
      withdrawalPeriodDays: 10,
      mrlMgPerKg: 0.2,
    },
  ];

  await Medicine.insertMany(medicines);
  console.log('Medicines seeded');
  await mongoose.disconnect();
}

seedMedicines().catch(console.error);
