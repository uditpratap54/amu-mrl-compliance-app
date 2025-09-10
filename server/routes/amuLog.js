// server/routes/amuLog.js

const express = require('express');
const router = express.Router();
const amuLogController = require('../controllers/amuLog');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const Joi = require('joi');

const amuLogSchema = {
  body: Joi.object({
    animalTagId: Joi.string().required(),
    medicineCode: Joi.string().required(),
    doseMgPerKg: Joi.number().positive().required(),
    route: Joi.string().required(),
    date: Joi.date().required(),
    prescriber: Joi.string().required(),
    notes: Joi.string().allow('', null),
  }),
};

router.use(authenticateToken);
router.use(authorizeRoles('ADMIN', 'FARMER', 'VET'));

router.post('/', validate(amuLogSchema), amuLogController.createAMUEvent);
router.get('/', amuLogController.getAMUEvents);
router.get('/:id', amuLogController.getAMUEventById);
router.put('/:id', validate(amuLogSchema), amuLogController.updateAMUEvent);
router.delete('/:id', amuLogController.deleteAMUEvent);

module.exports = router;
