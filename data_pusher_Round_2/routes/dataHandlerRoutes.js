const express = require('express');
const router = express.Router();
const dataHandlerController = require('../controllers/dataHandlerController');
const { validateIncomingData } = require('../middleware/validationMiddleware'); // ⬅️ Fix import
const limiter = require('../middleware/rateLimiter');


router.post('/incoming_data',validateIncomingData,limiter,dataHandlerController.receiveData);

module.exports = router;
