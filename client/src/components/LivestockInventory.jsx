// client/src/components/LivestockInventory.js
// Form for livestock inventory management

import React from 'react';
import { useFormik } from 'formik';
import { livestockSchema } from '../utils/validation';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function LivestockInventory() {
  const { t } = useTranslation();

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
      try {
        await api.createLivestock(values);
        alert('Livestock saved');
        resetForm();
      } catch (err) {
        alert(err.message || 'Error saving livestock');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>{t('nav.livestockInventory')}</h2>
      {['tagId', 'species', 'breed', 'age', 'weight', 'farmerId', 'status'].map((field) => (
        <div key={field}>
          <label>{t(`form.livestock.${field}`)}</label>
          <input {...formik.getFieldProps(field)} />
          {formik.touched[field] && formik.errors[field] ? (
            <div>{formik.errors[field]}</div>
          ) : null}
        </div>
      ))}
      <button type="submit">{t('form.livestock.submit')}</button>
    </form>
  );
}
