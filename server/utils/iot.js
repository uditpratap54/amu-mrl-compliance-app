// server/utils/iot.js
// Stub for IoT sensor data ingestion

const sensorLogs = [];

function ingestSensorData(data) {
  // Minimal validation and store in-memory (replace with real DB in prod)
  if (data.animalTagId && data.type && data.value && data.timestamp) {
    sensorLogs.push(data);
    return true;
  }
  return false;
}

function getSensorLogs() {
  return sensorLogs;
}

module.exports = { ingestSensorData, getSensorLogs };
