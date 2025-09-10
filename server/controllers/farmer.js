// server/controllers/farmer.js
const Farmer = require('../models/Farmer');
const mongoose = require('mongoose');

// Create a new farmer
exports.createFarmer = async (req, res, next) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();
    res.status(201).json({
      success: true,
      message: 'Farmer created successfully',
      data: farmer
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Farmer with this farm ID already exists',
        error: err.message
      });
    }
    next(err);
  }
};

// Get all farmers with pagination and search
exports.getFarmers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    
    const skip = (page - 1) * limit;
    
    // Build search query
    const searchQuery = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { farmId: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } }
      ]
    } : {};
    
    const farmers = await Farmer.find(searchQuery)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);
      
    const total = await Farmer.countDocuments(searchQuery);
    
    res.json({
      success: true,
      data: farmers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get farmer by ID
exports.getFarmerById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid farmer ID format'
      });
    }
    
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }
    
    res.json({
      success: true,
      data: farmer
    });
  } catch (err) {
    next(err);
  }
};

// Update farmer
exports.updateFarmer = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid farmer ID format'
      });
    }
    
    const farmer = await Farmer.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Farmer updated successfully',
      data: farmer
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Farmer with this farm ID already exists',
        error: err.message
      });
    }
    next(err);
  }
};

// Delete farmer
exports.deleteFarmer = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid farmer ID format'
      });
    }
    
    const farmer = await Farmer.findByIdAndDelete(req.params.id);
    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Farmer deleted successfully',
      data: farmer
    });
  } catch (err) {
    next(err);
  }
};

// Get farmer statistics
exports.getFarmerStats = async (req, res, next) => {
  try {
    const totalFarmers = await Farmer.countDocuments();
    const recentFarmers = await Farmer.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });
    
    res.json({
      success: true,
      data: {
        totalFarmers,
        recentFarmers,
        growthRate: totalFarmers > 0 ? ((recentFarmers / totalFarmers) * 100).toFixed(2) : 0
      }
    });
  } catch (err) {
    next(err);
  }
};
