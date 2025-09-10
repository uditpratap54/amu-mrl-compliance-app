// client/src/components/AMULogForm.js
// Log antimicrobial use events

import React from 'react';
import { useFormik } from 'formik';
import { amuEventSchema } from '../utils/validation';
import { useTranslation } from 'react-i18next';
import api from '../services/api';

export default function AMULogForm() {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      animalTagId: '',
      medicineCode: '',
      doseMgPerKg: '',
      route: '',
      date: '',
      prescriber: '',
      notes: '',
    },
    validationSchema: amuEventSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await api.createAMUEvent(values);
        alert('AMU Event saved');
        resetForm();
      } catch (err) {
        alert(err.message || 'Error saving AMU event');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>{t('nav.amuLog')}</h2>
      {['animalTagId', 'medicineCode', 'doseMgPerKg', 'route', 'date', 'prescriber', 'notes'].map(
        (field) => (
          <div key={field}>
            <label>{t(`form.amuEvent.${field}`)}</label>
            <input {...formik.getFieldProps(field)} />
            {formik.touched[field] && formik.errors[field] ? (
              <div>{formik.errors[field]}</div>
            ) : null}
          </div>
        )
      )}
      <button type="submit">{t('form.amuEvent.submit')}</button>
    </form>
  );
}
