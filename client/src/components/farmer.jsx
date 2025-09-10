// client/src/components/FarmerForm.js
// Form to add/edit Farmer records

import React from 'react';
import { useFormik } from 'formik';
import { farmerSchema } from '../utils/validation';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function FarmerForm() {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { name: '', phone: '', address: '', farmId: '' },
    validationSchema: farmerSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await api.createFarmer(values);
        alert('Farmer saved');
        resetForm();
      } catch (err) {
        alert(err.message || 'Error saving farmer');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>{t('nav.farmerForm')}</h2>
      <div>
        <label>{t('form.farmer.name')}</label>
        <input {...formik.getFieldProps('name')} />
        {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
      </div>
      <div>
        <label>{t('form.farmer.phone')}</label>
        <input {...formik.getFieldProps('phone')} />
        {formik.touched.phone && formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
      </div>
      <div>
        <label>{t('form.farmer.address')}</label>
        <input {...formik.getFieldProps('address')} />
        {formik.touched.address && formik.errors.address ? <div>{formik.errors.address}</div> : null}
      </div>
      <div>
        <label>{t('form.farmer.farmId')}</label>
        <input {...formik.getFieldProps('farmId')} />
        {formik.touched.farmId && formik.errors.farmId ? <div>{formik.errors.farmId}</div> : null}
      </div>
      <button type="submit">{t('form.farmer.submit')}</button>
    </form>
  );
}
