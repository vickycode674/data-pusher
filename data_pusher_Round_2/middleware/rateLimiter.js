const rateLimit = require('express-rate-limit');

// 5 requests per second = 5000ms window with 5 max
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 5,
  keyGenerator: (req, res) => {
    return req.headers['cl-x-token'] || req.ip; // use token if available
  },
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
