// server/seed/index.js - Main seeder

require('dotenv').config();
const mongoose = require('mongoose');

// Import all seed functions
const seedFarmers = require('./seedFarmers');
const seedMedicines = require('./seedMedicines');
const seedLivestock = require('./seedLivestock');
const seedAMUEvents = require('./seedAMUEvents');
const seedComplianceLogs = require('./seedComplianceLogs');

async function runAllSeeds() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to database
    const MONGO_URI = process.env.MONGO_URI_LOCAL || 'mongodb://127.0.0.1:27017/amu_mrl';
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Run seeds in order (due to dependencies)
    console.log('📦 Seeding Farmers...');
    await require('./seedFarmers');
    
    console.log('💊 Seeding Medicines...');
    await require('./seedMedicines');
    
    console.log('🐄 Seeding Livestock...');
    await require('./seedLivestock');
    
    console.log('📊 Seeding AMU Events...');
    await require('./seedAMUEvents');
    
    console.log('📋 Seeding Compliance Logs...');
    await require('./seedComplianceLogs');

    console.log('🎉 All seeds completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run if called directly
if (require.main === module) {
  runAllSeeds();
}

module.exports = runAllSeeds;
