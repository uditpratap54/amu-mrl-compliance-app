// client/src/utils/validation.js
// Yup schemas for form validation with regulatory defaults

import * as Yup from 'yup';

const phoneRegex = /^[6-9]\d{9}$/;

export const farmerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    .required('Phone is required'),
  address: Yup.string().required('Address is required'),
  farmId: Yup.string().required('Farm ID is required'),
});

export const livestockSchema = Yup.object().shape({
  tagId: Yup.string().required('Tag ID is required'),
  species: Yup.string().required('Species is required'),
  breed: Yup.string().required('Breed is required'),
  age: Yup.number().positive('Age must be positive').required('Age is required'),
  weight: Yup.number().positive('Weight must be positive').required('Weight is required'),
  farmerId: Yup.string().required('Farmer ID is required'),
  status: Yup.string().required('Status is required'),
});

export const medicineSchema = Yup.object().shape({
  code: Yup.string().required('Medicine Code is required'),
  name: Yup.string().required('Medicine Name is required'),
  atcClass: Yup.string().required('ATC Class is required'),
  withdrawalPeriodDays: Yup.number()
    .positive('Withdrawal Period must be positive')
    .required('Withdrawal Period is required'),
  mrlMgPerKg: Yup.number().positive('MRL must be positive').required('MRL is required'),
});

export const amuEventSchema = Yup.object().shape({
  animalTagId: Yup.string().required('Animal Tag ID is required'),
  medicineCode: Yup.string().required('Medicine Code is required'),
  doseMgPerKg: Yup.number().positive('Dose must be positive').required('Dose is required'),
  route: Yup.string().required('Route is required'),
  date: Yup.date().required('Date is required'),
  prescriber: Yup.string().required('Prescriber is required'),
  notes: Yup.string().nullable(),
});
