// client/src/pages/Reports.js
// KPIs and charts page using Recharts and react-query

import React from 'react';
import { useQuery } from 'react-query';
import api from '../services/api';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';

export default function Reports() {
  const { t } = useTranslation();

  const { data, isLoading, error, refetch } = useQuery('reports', () => api.getReports ? api.getReports() : Promise.resolve({}), {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reports</div>;

  // Dummy data for example
  const kpis = {
    totalLivestock: 150,
    amuEventsThisMonth: 45,
    percentCompliant: 92,
    mrlRiskAlerts: 3,
  };

  const amuPerWeek = [
    { week: 'Week 1', count: 12 },
    { week: 'Week 2', count: 15 },
    { week: 'Week 3', count: 11 },
    { week: 'Week 4', count: 7 },
  ];

  const eventByMedicine = [
    { medicine: 'Med A', count: 18 },
    { medicine: 'Med B', count: 9 },
    { medicine: 'Med C', count: 18 },
  ];

  const heatmapData = [
    { animalTagId: 'A1', week1: 1, week2: 0, week3: 0, week4: 0 },
    { animalTagId: 'A2', week1: 0, week2: 0, week3: 1, week4: 1 },
  ];

  const handleRescore = async () => {
    try {
      await fetch('/ml/score', { method: 'POST' });
      alert('Re-score triggered');
      refetch();
    } catch {
      alert('Failed to trigger rescore');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>AMU/MRL Compliance Dashboard</h1>
        <p>Comprehensive overview of livestock compliance metrics and analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>{kpis.totalLivestock}</h3>
          <p>Total Livestock</p>
        </div>
        <div className="stat-card">
          <h3>{kpis.amuEventsThisMonth}</h3>
          <p>AMU Events This Month</p>
        </div>
        <div className="stat-card">
          <h3>{kpis.percentCompliant}%</h3>
          <p>Compliance Rate</p>
        </div>
        <div className="stat-card">
          <h3>{kpis.mrlRiskAlerts}</h3>
          <p>MRL Risk Alerts</p>
        </div>
      </div>

      <div className="card">
        <button onClick={handleRescore} className="mb-3">Re-score Risk Analysis</button>
      </div>

      {/* Charts Section */}
      <div className="chart-container">
        <h3>AMU Events per Week</h3>
        <LineChart width={500} height={300} data={amuPerWeek}>
          <Line type="monotone" dataKey="count" stroke="#667eea" strokeWidth={3} />
          <CartesianGrid stroke="#e1e5e9" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>

      <div className="chart-container">
        <h3>Events by Medicine Type</h3>
        <BarChart width={500} height={300} data={eventByMedicine}>
          <XAxis dataKey="medicine" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#667eea" />
        </BarChart>
      </div>

      {/* Risk Heatmap Table */}
      <div className="card">
        <h3>Risk Heatmap (Animal Tag by Week)</h3>
        <table>
          <thead>
            <tr>
              <th>Animal Tag</th>
              <th>Week 1</th>
              <th>Week 2</th>
              <th>Week 3</th>
              <th>Week 4</th>
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row) => (
              <tr key={row.animalTagId}>
                <td><strong>{row.animalTagId}</strong></td>
                <td style={{background: row.week1 ? '#ff4757' : '#2ed573', color: 'white', textAlign: 'center'}}>{row.week1}</td>
                <td style={{background: row.week2 ? '#ff4757' : '#2ed573', color: 'white', textAlign: 'center'}}>{row.week2}</td>
                <td style={{background: row.week3 ? '#ff4757' : '#2ed573', color: 'white', textAlign: 'center'}}>{row.week3}</td>
                <td style={{background: row.week4 ? '#ff4757' : '#2ed573', color: 'white', textAlign: 'center'}}>{row.week4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
