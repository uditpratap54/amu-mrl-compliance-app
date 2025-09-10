// server/middleware/validate.js
// Celebrate & Joi validation middleware wrapper

const { celebrate, Joi, Segments } = require('celebrate');

// Validation schema example for auth login
const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

// Generic validation middleware creator
function validate(schema) {
  return celebrate(schema);
}

module.exports = {
  loginValidation,
  validate,
};
