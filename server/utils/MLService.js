// server/utils/MLService.js
// Calls Python FastAPI ML microservice for compliance scoring

const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

async function calculateCompliance(event) {
  try {
    const response = await axios.post(`${ML_SERVICE_URL}/score`, { event });
    return response.data; // { ruleFlags: [], modelScore: 0.7 }
  } catch (err) {
    console.error('MLService error:', err.message);
    // fallback empty result
    return { ruleFlags: [], modelScore: null };
  }
}

module.exports = { calculateCompliance };
