// server/seed/seedFarmers.js

require('dotenv').config();
const mongoose = require('mongoose');
const Farmer = require('../models/Farmer');

async function seedFarmers() {
  const MONGO_URI = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/amu_mrl';
  await mongoose.connect(MONGO_URI);

  await Farmer.deleteMany({});

  const farmers = [
    { name: 'Ramesh Kumar', phone: '9876543210', address: 'Village A', farmId: 'FARM001' },
    { name: 'Suresh Singh', phone: '9876543211', address: 'Village B', farmId: 'FARM002' },
  ];

  await Farmer.insertMany(farmers);
  console.log('Farmers seeded');
  await mongoose.disconnect();
}

seedFarmers().catch(console.error);
