// client/src/components/MedicineLog.js
// Form for medicine data entry

import React from 'react';
import { useFormik } from 'formik';
import { medicineSchema } from '../utils/validation';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function MedicineLog() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      code: '',
      name: '',
      atcClass: '',
      withdrawalPeriodDays: '',
      mrlMgPerKg: '',
    },
    validationSchema: medicineSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setMessage(null);
      try {
        await api.createMedicine(values);
        setMessage({ type: 'success', text: 'Medicine registered successfully!' });
        resetForm();
      } catch (err) {
        setMessage({ type: 'error', text: err.message || 'Error saving medicine' });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="card">
      <h2>Register New Medicine</h2>
      
      {message && (
        <div className={message.type === 'success' ? 'success' : 'error'}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Medicine Code</label>
          <input type="text" placeholder="e.g., AMX001" {...formik.getFieldProps('code')} />
          {formik.touched.code && formik.errors.code && <div className="error">{formik.errors.code}</div>}
        </div>
        
        <div className="form-group">
          <label>Medicine Name</label>
          <input type="text" placeholder="e.g., Amoxicillin" {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label>ATC Class</label>
          <select {...formik.getFieldProps('atcClass')}>
            <option value="">Select ATC Class</option>
            <option value="J01CA">J01CA - Penicillins with extended spectrum</option>
            <option value="J01CE">J01CE - Beta-lactamase sensitive penicillins</option>
            <option value="J01AA">J01AA - Tetracyclines</option>
            <option value="J01MA">J01MA - Fluoroquinolones</option>
          </select>
          {formik.touched.atcClass && formik.errors.atcClass && <div className="error">{formik.errors.atcClass}</div>}
        </div>
        
        <div className="form-group">
          <label>Withdrawal Period (days)</label>
          <input type="number" placeholder="7" {...formik.getFieldProps('withdrawalPeriodDays')} />
          {formik.touched.withdrawalPeriodDays && formik.errors.withdrawalPeriodDays && <div className="error">{formik.errors.withdrawalPeriodDays}</div>}
        </div>
        
        <div className="form-group">
          <label>MRL Limit (mg/kg)</label>
          <input type="number" step="0.01" placeholder="0.1" {...formik.getFieldProps('mrlMgPerKg')} />
          {formik.touched.mrlMgPerKg && formik.errors.mrlMgPerKg && <div className="error">{formik.errors.mrlMgPerKg}</div>}
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register Medicine'}
        </button>
      </form>
    </div>
  );
}
