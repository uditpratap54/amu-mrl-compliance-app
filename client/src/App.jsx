// client/src/App.js
// Top-level routing + i18n init + role-based protected routes

import React, { Suspense, useState } from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  Outlet,
  useNavigate,
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

// Mock auth context for demo - replace with real auth context later
const UserRoleGuard = ({ allowedRoles, children }) => {
  const { user } = React.useContext(UserContext);
  if (!user) return <Navigate to="/login" replace />;
  return allowedRoles.includes(user.role) ? (children || <Outlet />) : <Navigate to="/" replace />;
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
  const [isLoading, setIsLoading] = React.useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Form submitted!', { username, role });
    
    if (username.trim()) {
      try {
        console.log('Setting user:', { username, role });
        setUser({ username, role });
        
        // Small delay to ensure state is updated
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('Navigating to home...');
        navigate('/');
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Username is empty!');
      alert('Please enter a username');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>AMU/MRL Compliance Login</h2>
        <div className="form-group">
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-label="Username"
              placeholder="Enter your username"
            />
          </label>
        </div>
        <div className="form-group">
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/*" 
              element={
                <UserRoleGuard allowedRoles={['ADMIN', 'FARMER', 'VET', 'AUDITOR']}>
                  <Navbar />
                  <main className="container">
                    <Routes>
                      <Route path="/" element={<Reports />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/farmer" element={<FarmerForm />} />
                      <Route path="/livestock" element={<LivestockInventory />} />
                      <Route path="/medicine" element={<MedicineLog />} />
                      <Route path="/amu-log" element={<AMULogForm />} />
                      <Route path="/chatbot" element={<Chatbot />} />
                      <Route path="/gamification" element={<Gamification />} />
                    </Routes>
                  </main>
                </UserRoleGuard>
              } 
            />
          </Routes>
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;
