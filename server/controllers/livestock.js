// server/controllers/livestock.js
const Livestock = require('../models/Livestock');

exports.createLivestock = async (req, res, next) => {
  try {
    const livestock = new Livestock(req.body);
    await livestock.save();
    res.status(201).json(livestock);
  } catch (err) {
    next(err);
  }
};

exports.getLivestock = async (req, res, next) => {
  try {
    const list = await Livestock.find().populate('farmerId');
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.getLivestockById = async (req, res, next) => {
  try {
    const livestock = await Livestock.findById(req.params.id);
    if (!livestock) return res.status(404).json({ message: 'Livestock not found' });
    res.json(livestock);
  } catch (err) {
    next(err);
  }
};

exports.updateLivestock = async (req, res, next) => {
  try {
    const livestock = await Livestock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livestock) return res.status(404).json({ message: 'Livestock not found' });
    res.json(livestock);
  } catch (err) {
    next(err);
  }
};

exports.deleteLivestock = async (req, res, next) => {
  try {
    const livestock = await Livestock.findByIdAndDelete(req.params.id);
    if (!livestock) return res.status(404).json({ message: 'Livestock not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};
