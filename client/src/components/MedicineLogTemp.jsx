import React from 'react';

export default function MedicineLog() {
  const [medicines] = React.useState([
    { code: 'AMX001', name: 'Amoxicillin', withdrawalDays: 7, mrl: 0.1 },
    { code: 'PEN002', name: 'Penicillin G', withdrawalDays: 4, mrl: 0.05 },
    { code: 'TET003', name: 'Tetracycline', withdrawalDays: 14, mrl: 0.2 },
  ]);

  return (
    <div className="card">
      <h2>Medicine Database</h2>
      <p>Registered veterinary medicines with MRL limits and withdrawal periods</p>
      
      <table>
        <thead>
          <tr>
            <th>Medicine Code</th>
            <th>Name</th>
            <th>Withdrawal Period (days)</th>
            <th>MRL Limit (mg/kg)</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med.code}>
              <td><strong>{med.code}</strong></td>
              <td>{med.name}</td>
              <td>{med.withdrawalDays}</td>
              <td>{med.mrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-3">
        <button>Add New Medicine</button>
      </div>
    </div>
  );
}
