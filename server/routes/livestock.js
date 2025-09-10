
// server/routes/livestock.js

const express = require('express');
const router = express.Router();
const livestockController = require('../controllers/livestock');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const Joi = require('joi');

const livestockSchema = {
  body: Joi.object({
    tagId: Joi.string().required(),
    species: Joi.string().required(),
    breed: Joi.string().required(),
    age: Joi.number().positive().required(),
    weight: Joi.number().positive().required(),
    farmerId: Joi.string().required(),
    status: Joi.string().valid('active', 'sold', 'deceased', 'quarantined').required(),
  }),
};

router.use(authenticateToken);
router.use(authorizeRoles('ADMIN', 'FARMER', 'VET'));

router.post('/', validate(livestockSchema), livestockController.createLivestock);
router.get('/', livestockController.getLivestock);
router.get('/:id', livestockController.getLivestockById);
router.put('/:id', validate(livestockSchema), livestockController.updateLivestock);
router.delete('/:id', livestockController.deleteLivestock);

module.exports = router;
