const express = require('express');
const router = express.Router();
const { handleIncomingData } = require('../controllers/incomingController');

// Only POST is allowed here
router.post('/incoming_data', handleIncomingData);

module.exports = router;
