// server/routes/chatbot.js

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { message } = req.body;
  const tips = [
    'Ensure antimicrobial doses follow guidelines.',
    'Record all medicine use promptly.',
    'Maintain livestock health records accurately.',
    'Always consult a vet before new medicines.',
    'Monitor withdrawal periods closely.',
  ];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  res.json({ reply: randomTip });
});

module.exports = router;
