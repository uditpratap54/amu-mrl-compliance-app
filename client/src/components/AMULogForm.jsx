// client/src/components/AMULogForm.js
// Log antimicrobial use events

import React from 'react';
import { useFormik } from 'formik';
import { amuEventSchema } from '../utils/validation';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function AMULogForm() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      animalTagId: '',
      medicineCode: '',
      doseMgPerKg: '',
      route: '',
      date: new Date().toISOString().split('T')[0], // Today's date
      prescriber: '',
      notes: '',
    },
    validationSchema: amuEventSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setMessage(null);
      try {
        await api.createAMUEvent(values);
        setMessage({ type: 'success', text: 'AMU Event logged successfully!' });
        resetForm();
        // Reset date to today
        formik.setFieldValue('date', new Date().toISOString().split('T')[0]);
      } catch (err) {
        setMessage({ type: 'error', text: err.message || 'Error saving AMU event' });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="card">
      <h2>Log AMU Event</h2>
      <p>Record antimicrobial usage for compliance tracking</p>
      
      {message && (
        <div className={message.type === 'success' ? 'success' : 'error'}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Animal Tag ID</label>
          <input type="text" placeholder="e.g., COW001" {...formik.getFieldProps('animalTagId')} />
          {formik.touched.animalTagId && formik.errors.animalTagId && <div className="error">{formik.errors.animalTagId}</div>}
        </div>
        
        <div className="form-group">
          <label>Medicine Code</label>
          <input type="text" placeholder="e.g., AMX001" {...formik.getFieldProps('medicineCode')} />
          {formik.touched.medicineCode && formik.errors.medicineCode && <div className="error">{formik.errors.medicineCode}</div>}
        </div>
        
        <div className="form-group">
          <label>Dose (mg/kg)</label>
          <input type="number" step="0.01" placeholder="15" {...formik.getFieldProps('doseMgPerKg')} />
          {formik.touched.doseMgPerKg && formik.errors.doseMgPerKg && <div className="error">{formik.errors.doseMgPerKg}</div>}
        </div>
        
        <div className="form-group">
          <label>Administration Route</label>
          <select {...formik.getFieldProps('route')}>
            <option value="">Select Route</option>
            <option value="Oral">Oral</option>
            <option value="Intramuscular">Intramuscular (IM)</option>
            <option value="Intravenous">Intravenous (IV)</option>
            <option value="Subcutaneous">Subcutaneous (SC)</option>
            <option value="Topical">Topical</option>
            <option value="Intramammary">Intramammary</option>
          </select>
          {formik.touched.route && formik.errors.route && <div className="error">{formik.errors.route}</div>}
        </div>
        
        <div className="form-group">
          <label>Date of Administration</label>
          <input type="date" {...formik.getFieldProps('date')} />
          {formik.touched.date && formik.errors.date && <div className="error">{formik.errors.date}</div>}
        </div>
        
        <div className="form-group">
          <label>Prescriber (Veterinarian)</label>
          <input type="text" placeholder="Dr. Name" {...formik.getFieldProps('prescriber')} />
          {formik.touched.prescriber && formik.errors.prescriber && <div className="error">{formik.errors.prescriber}</div>}
        </div>
        
        <div className="form-group">
          <label>Notes (Optional)</label>
          <textarea rows="3" placeholder="Additional notes about treatment..." {...formik.getFieldProps('notes')} />
          {formik.touched.notes && formik.errors.notes && <div className="error">{formik.errors.notes}</div>}
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging...' : 'Log AMU Event'}
        </button>
      </form>
    </div>
  );
}
