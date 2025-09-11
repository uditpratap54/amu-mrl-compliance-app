// client/src/components/FarmerForm.js
// Form to add/edit Farmer records

import React from 'react';
import { useFormik } from 'formik';
import { farmerSchema } from '../utils/validation';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function FarmerForm() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const formik = useFormik({
    initialValues: { name: '', phone: '', address: '', farmId: '' },
    validationSchema: farmerSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setMessage(null);
      try {
        await api.createFarmer(values);
        setMessage({ type: 'success', text: 'Farmer registered successfully!' });
        resetForm();
      } catch (err) {
        setMessage({ type: 'error', text: err.message || 'Error saving farmer' });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="card">
      <h2>Add New Farmer</h2>
      
      {message && (
        <div className={message.type === 'success' ? 'success' : 'error'}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Farmer Name</label>
          <input 
            type="text"
            placeholder="Enter farmer name"
            {...formik.getFieldProps('name')} 
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        
        <div className="form-group">
          <label>Phone Number</label>
          <input 
            type="tel"
            placeholder="Enter phone number"
            {...formik.getFieldProps('phone')} 
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="error">{formik.errors.phone}</div>
          ) : null}
        </div>
        
        <div className="form-group">
          <label>Address</label>
          <textarea 
            placeholder="Enter complete address"
            {...formik.getFieldProps('address')} 
            rows="3"
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="error">{formik.errors.address}</div>
          ) : null}
        </div>
        
        <div className="form-group">
          <label>Farm ID</label>
          <input 
            type="text"
            placeholder="Enter farm ID"
            {...formik.getFieldProps('farmId')} 
          />
          {formik.touched.farmId && formik.errors.farmId ? (
            <div className="error">{formik.errors.farmId}</div>
          ) : null}
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Farmer'}
        </button>
      </form>
    </div>
  );
}
