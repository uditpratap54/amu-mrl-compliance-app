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
  HeatMapChart, // Placeholder, since Recharts does not have HeatMap, will use custom or skip
} from 'recharts';

export default function Reports() {
  const { t } = useTranslation();

  const { data, isLoading, error, refetch } = useQuery('reports', () => apiClient.get('/reports').then(r => r.data), {
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
    <div>
      <h2>{t('nav.reports')}</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div>
          <h3>{t('reports.totalLivestock')}</h3>
          <p>{kpis.totalLivestock}</p>
        </div>
        <div>
          <h3>{t('reports.amuEventsThisMonth')}</h3>
          <p>{kpis.amuEventsThisMonth}</p>
        </div>
        <div>
          <h3>{t('reports.percentCompliant')}</h3>
          <p>{kpis.percentCompliant}%</p>
        </div>
        <div>
          <h3>{t('reports.mrlRiskAlerts')}</h3>
          <p>{kpis.mrlRiskAlerts}</p>
        </div>
      </div>

      <button onClick={handleRescore}>{t('reports.rescoreButton')}</button>

      <h3>AMU per Week</h3>
      <LineChart width={500} height={300} data={amuPerWeek}>
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
      </LineChart>

      <h3>Events by Medicine</h3>
      <BarChart width={500} height={300} data={eventByMedicine}>
        <XAxis dataKey="medicine" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>

      <h3>Risk Heatmap (animalTagId by week)</h3>
      {/* Placeholder for heatmap chart */}
      <table border="1">
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
              <td>{row.animalTagId}</td>
              <td>{row.week1}</td>
              <td>{row.week2}</td>
              <td>{row.week3}</td>
              <td>{row.week4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
