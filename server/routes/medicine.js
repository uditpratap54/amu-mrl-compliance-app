// server/routes/medicine.js

const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicine');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const Joi = require('joi');

const medicineSchema = {
  body: Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
    atcClass: Joi.string().required(),
    withdrawalPeriodDays: Joi.number().positive().required(),
    mrlMgPerKg: Joi.number().positive().required(),
  }),
};

router.use(authenticateToken);
router.use(authorizeRoles('ADMIN', 'VET'));

router.post('/', validate(medicineSchema), medicineController.createMedicine);
router.get('/', medicineController.getMedicines);
router.get('/:id', medicineController.getMedicineById);
router.put('/:id', validate(medicineSchema), medicineController.updateMedicine);
router.delete('/:id', medicineController.deleteMedicine);

module.exports = router;
