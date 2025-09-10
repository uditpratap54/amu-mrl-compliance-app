// server/seed/seedLivestock.js

require('dotenv').config();
const mongoose = require('mongoose');
const Livestock = require('../models/Livestock');
const Farmer = require('../models/Farmer');

async function seedLivestock() {
  const MONGO_URI = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/amu_mrl';
  await mongoose.connect(MONGO_URI);

  await Livestock.deleteMany({});
  const farmers = await Farmer.find();

  const livestock = [
    {
      tagId: 'TAG001',
      species: 'Cattle',
      breed: 'Holstein',
      age: 3,
      weight: 500,
      farmerId: farmers[0]._id,
      status: 'active',
    },
    {
      tagId: 'TAG002',
      species: 'Goat',
      breed: 'Boer',
      age: 2,
      weight: 45,
      farmerId: farmers[1]._id,
      status: 'active',
    },
  ];

  await Livestock.insertMany(livestock);
  console.log('Livestock seeded');
  await mongoose.disconnect();
}

seedLivestock().catch(console.error);
