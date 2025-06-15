const express = require('express');
const router = express.Router();
const dataHandlerController = require('../controllers/dataHandlerController');
const { validateIncomingData } = require('../middleware/validationMiddleware'); // ⬅️ Fix import

router.post('/incoming_data',validateIncomingData,dataHandlerController.receiveData);

module.exports = router;
