// client/src/App.js
// Top-level routing + i18n init + role-based protected routes

import React, { Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  Outlet,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FarmerForm from './components/farmer.jsx';
import LivestockInventory from './components/LivestockInventory.jsx';
import MedicineLog from './components/MedicineLog.jsx';
import AMULogForm from './components/AMULogForm.jsx';
import Chatbot from './components/Chatbot.jsx';
import Gamification from './components/Gamification.jsx';
import Reports from './pages/Reports.jsx';
import { UserContext, UserProvider } from './utils/UserContext.jsx';

// Mock auth context for demo - replace with real auth context/useQuery later
const UserRoleGuard = ({ allowedRoles }) => {
  const { user } = React.useContext(UserContext);
  if (!user) return <Navigate to="/login" replace />;
  return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/" replace />;
};

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  return (
    <select
      aria-label={t('language')}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      value={i18n.language}
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
    </select>
  );
};

const Navbar = () => {
  const { user, setUser } = React.useContext(UserContext);
  const { t } = useTranslation();

  const logout = () => {
    setUser(null);
    // TODO: Clear tokens
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">{t('nav.dashboard')}</Link> |{' '}
      <Link to="/farmer">{t('nav.farmerForm')}</Link> |{' '}
      <Link to="/livestock">{t('nav.livestockInventory')}</Link> |{' '}
      <Link to="/medicine">{t('nav.medicineLog')}</Link> |{' '}
      <Link to="/amu-log">{t('nav.amuLog')}</Link> |{' '}
      <Link to="/chatbot">{t('nav.chatbot')}</Link> |{' '}
      <Link to="/gamification">{t('nav.gamification')}</Link> |{' '}
      <Link to="/reports">{t('nav.reports')}</Link> |{' '}
      {user ? <button onClick={logout}>{t('nav.logout')}</button> : <Link to="/login">Login</Link>} |{' '}
      <LanguageSwitcher />
    </nav>
  );
};

const LoginPage = () => {
  const { setUser } = React.useContext(UserContext);
  const [username, setUsername] = React.useState('');
  const [role, setRole] = React.useState('FARMER'); // Simplified login
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username, role });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login (Demo)</h2>
      <div>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label="Username"
          />
        </label>
      </div>
      <div>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="ADMIN">Admin</option>
            <option value="VET">Veterinarian</option>
            <option value="FARMER">Farmer</option>
            <option value="AUDITOR">Auditor</option>
          </select>
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<UserRoleGuard allowedRoles={['ADMIN', 'FARMER', 'VET', 'AUDITOR']} />}>
              <Route path="/" element={<Reports />} />
            </Route>
            <Route element={<UserRoleGuard allowedRoles={['FARMER']} />}>
              <Route path="/farmer" element={<FarmerForm />} />
              <Route path="/livestock" element={<LivestockInventory />} />
              <Route path="/medicine" element={<MedicineLog />} />
              <Route path="/amu-log" element={<AMULogForm />} />
            </Route>
            <Route element={<UserRoleGuard allowedRoles={['FARMER', 'VET', 'AUDITOR']} />}>
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/gamification" element={<Gamification />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;
