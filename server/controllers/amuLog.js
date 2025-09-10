// server/controllers/amuLog.js
const AMUEvent = require('../models/AMUEvent');
const ComplianceLog = require('../models/ComplianceLog');
const MLService = require('../utils/MLService');

exports.createAMUEvent = async (req, res, next) => {
  try {
    const event = new AMUEvent(req.body);
    await event.save();

    // Calculate compliance log asynchronously via MLService
    MLService.calculateCompliance(event).then(async ({ ruleFlags, modelScore }) => {
      await ComplianceLog.findOneAndUpdate(
        { eventRef: event._id },
        { ruleFlags, modelScore },
        { upsert: true }
      );
    });

    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

exports.getAMUEvents = async (req, res, next) => {
  try {
    const events = await AMUEvent.find();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

exports.getAMUEventById = async (req, res, next) => {
  try {
    const event = await AMUEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'AMU Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

exports.updateAMUEvent = async (req, res, next) => {
  try {
    const event = await AMUEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'AMU Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

exports.deleteAMUEvent = async (req, res, next) => {
  try {
    const event = await AMUEvent.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'AMU Event not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};
