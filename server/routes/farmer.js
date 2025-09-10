// server/routes/farmer.js

const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmer');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const Joi = require('joi');

const farmerSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    farmId: Joi.string().required(),
  }),
};

router.use(authenticateToken);
router.use(authorizeRoles('ADMIN', 'FARMER', 'VET'));

router.post('/', validate(farmerSchema), farmerController.createFarmer);
router.get('/', farmerController.getFarmers);
router.get('/:id', farmerController.getFarmerById);
router.put('/:id', validate(farmerSchema), farmerController.updateFarmer);
router.delete('/:id', farmerController.deleteFarmer);

module.exports = router;
