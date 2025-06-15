const { body, validationResult } = require('express-validator');

const validateIncomingData = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Invalid Data', errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateIncomingData };
