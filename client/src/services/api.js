// client/src/services/api.js
// Axios instance + API method definitions

import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptors can be added here for JWT

// Auth
const login = async (username, password) => {
  // Placeholder for real auth call
  return { username, role: 'FARMER', token: 'fake-jwt-token' };
};

// Farmer
const createFarmer = (data) => apiClient.post('/farmer', data).then((res) => res.data);

// Livestock
const createLivestock = (data) => apiClient.post('/livestock', data).then((res) => res.data);

// Medicine
const createMedicine = (data) => apiClient.post('/medicine', data).then((res) => res.data);

// AMU Event
const createAMUEvent = (data) => apiClient.post('/amuLog', data).then((res) => res.data);

// Chatbot
const chatbotQuery = (text) =>
  apiClient.post('/chatbot', { message: text }).then((res) => res.data.reply);

// Gamification
const getGamificationStatus = () => apiClient.get('/gamification/status').then((res) => res.data);

export default {
  login,
  createFarmer,
  createLivestock,
  createMedicine,
  createAMUEvent,
  chatbotQuery,
  getGamificationStatus,
};
