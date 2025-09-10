// client/src/components/Gamification.js
// Simple gamification UI showing points fetched from the backend

import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Gamification() {
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await api.getGamificationStatus();
        setPoints(data.points);
        setBadges(data.badges || []);
      } catch {
        alert('Failed to load gamification data');
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Gamification</h2>
      <p>Your Points: {points}</p>
      <p>Your Badges: {badges.length > 0 ? badges.join(', ') : 'No badges yet'}</p>
    </div>
  );
}
