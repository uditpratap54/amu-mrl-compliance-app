// server/middleware/errorHandler.js
// Centralized error handler middleware

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  if (err.joi) {
    // Celebrate validation error
    return res.status(400).json({ message: err.joi.message });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;
