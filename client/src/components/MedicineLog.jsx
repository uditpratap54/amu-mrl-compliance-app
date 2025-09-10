// client/src/components/MedicineLog.js
// Form for medicine data entry

import React from 'react';
import { useFormik } from 'formik';
import { medicineSchema } from '../utils/validation';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function MedicineLog() {
  const { t } = useTranslation();

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
      try {
        await api.createMedicine(values);
        alert('Medicine saved');
        resetForm();
      } catch (err) {
        alert(err.message || 'Error saving medicine');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>{t('nav.medicineLog')}</h2>
      {['code', 'name', 'atcClass', 'withdrawalPeriodDays', 'mrlMgPerKg'].map((field) => (
        <div key={field}>
          <label>{t(`form.medicine.${field}`)}</label>
          <input {...formik.getFieldProps(field)} />
          {formik.touched[field] && formik.errors[field] ? (
            <div>{formik.errors[field]}</div>
          ) : null}
        </div>
      ))}
      <button type="submit">{t('form.medicine.submit')}</button>
    </form>
  );
}
