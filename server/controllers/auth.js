// server/controllers/auth.js
// User authentication: dummy users, JWT token generation, login

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refreshsecret';
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

// Dummy users for demo - in real app, users collection needed
const users = [
  {
    id: '1',
    username: 'admin',
    passwordHash: bcrypt.hashSync('adminpass', 8),
    role: 'ADMIN',
  },
  {
    id: '2',
    username: 'vetuser',
    passwordHash: bcrypt.hashSync('vetpass', 8),
    role: 'VET',
  },
  {
    id: '3',
    username: 'farmer1',
    passwordHash: bcrypt.hashSync('farmerpass', 8),
    role: 'FARMER',
  },
  {
    id: '4',
    username: 'auditor',
    passwordHash: bcrypt.hashSync('auditorpass', 8),
    role: 'AUDITOR',
  },
];

function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role, username: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const passwordValid = bcrypt.compareSync(password, user.passwordHash);
  if (!passwordValid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);
  res.json({ token, refreshToken, user: { username: user.username, role: user.role } });
};

exports.refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Refresh token required' });
  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
    const user = users.find((u) => u.id === payload.id);
    if (!user) throw new Error('User not found');
    const newToken = generateToken(user);
    res.json({ token: newToken });
  } catch (err) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};
