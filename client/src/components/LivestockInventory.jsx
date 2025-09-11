// client/src/components/LivestockInventory.js
// Form for livestock inventory management

import React from 'react';
import { useFormik } from 'formik';
import { livestockSchema } from '../utils/validation';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function LivestockInventory() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      tagId: '',
      species: '',
      breed: '',
      age: '',
      weight: '',
      farmerId: '',
      status: '',
    },
    validationSchema: livestockSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setMessage(null);
      try {
        await api.createLivestock(values);
        setMessage({ type: 'success', text: 'Livestock registered successfully!' });
        resetForm();
      } catch (err) {
        setMessage({ type: 'error', text: err.message || 'Error saving livestock' });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="card">
      <h2>Register Livestock</h2>
      
      {message && (
        <div className={message.type === 'success' ? 'success' : 'error'}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Animal Tag ID</label>
          <input type="text" placeholder="e.g., COW001" {...formik.getFieldProps('tagId')} />
          {formik.touched.tagId && formik.errors.tagId && <div className="error">{formik.errors.tagId}</div>}
        </div>
        
        <div className="form-group">
          <label>Species</label>
          <select {...formik.getFieldProps('species')}>
            <option value="">Select Species</option>
            <option value="Cattle">Cattle</option>
            <option value="Buffalo">Buffalo</option>
            <option value="Goat">Goat</option>
            <option value="Sheep">Sheep</option>
            <option value="Pig">Pig</option>
            <option value="Poultry">Poultry</option>
          </select>
          {formik.touched.species && formik.errors.species && <div className="error">{formik.errors.species}</div>}
        </div>
        
        <div className="form-group">
          <label>Breed</label>
          <input type="text" placeholder="e.g., Holstein Friesian" {...formik.getFieldProps('breed')} />
          {formik.touched.breed && formik.errors.breed && <div className="error">{formik.errors.breed}</div>}
        </div>
        
        <div className="form-group">
          <label>Age (months)</label>
          <input type="number" placeholder="24" {...formik.getFieldProps('age')} />
          {formik.touched.age && formik.errors.age && <div className="error">{formik.errors.age}</div>}
        </div>
        
        <div className="form-group">
          <label>Weight (kg)</label>
          <input type="number" placeholder="450" {...formik.getFieldProps('weight')} />
          {formik.touched.weight && formik.errors.weight && <div className="error">{formik.errors.weight}</div>}
        </div>
        
        <div className="form-group">
          <label>Farmer ID</label>
          <input type="text" placeholder="FARMER001" {...formik.getFieldProps('farmerId')} />
          {formik.touched.farmerId && formik.errors.farmerId && <div className="error">{formik.errors.farmerId}</div>}
        </div>
        
        <div className="form-group">
          <label>Status</label>
          <select {...formik.getFieldProps('status')}>
            <option value="">Select Status</option>
            <option value="Healthy">Healthy</option>
            <option value="Under Treatment">Under Treatment</option>
            <option value="Quarantine">Quarantine</option>
            <option value="Sold">Sold</option>
          </select>
          {formik.touched.status && formik.errors.status && <div className="error">{formik.errors.status}</div>}
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register Livestock'}
        </button>
      </form>
    </div>
  );
}
