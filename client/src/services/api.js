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
const createFarmer = (data) => {
  console.log('Creating farmer:', data);
  return Promise.resolve({ id: Date.now(), ...data, status: 'created' });
};

// Livestock
const createLivestock = (data) => {
  console.log('Creating livestock:', data);
  return Promise.resolve({ id: Date.now(), ...data, status: 'created' });
};

// Medicine
const createMedicine = (data) => {
  console.log('Creating medicine:', data);
  return Promise.resolve({ id: Date.now(), ...data, status: 'created' });
};

// AMU Event
const createAMUEvent = (data) => {
  console.log('Creating AMU event:', data);
  return Promise.resolve({ id: Date.now(), ...data, status: 'logged' });
};

// Chatbot
const chatbotQuery = (text) => {
  // Mock responses for demo
  const responses = [
    "For AMU compliance, ensure proper withdrawal periods are followed.",
    "MRL limits vary by medicine type. Check our medicine database for specific values.",
    "All antimicrobial usage must be logged within 24 hours of administration.",
    "Veterinary prescription is required for all antimicrobial treatments.",
    "Regular compliance audits help maintain regulatory standards."
  ];
  return Promise.resolve(responses[Math.floor(Math.random() * responses.length)]);
};

// Reports
const getReports = () => Promise.resolve({ status: 'demo' });

// Gamification
const getGamificationStatus = () => Promise.resolve({ points: 125, badges: ['Compliance Star', 'Data Champion'] });

export default {
  login,
  createFarmer,
  createLivestock,
  createMedicine,
  createAMUEvent,
  chatbotQuery,
  getGamificationStatus,
  getReports,
};
