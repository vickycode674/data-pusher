const express = require('express');
const router = express.Router();

const destinationController = require('../controllers/destinationController');

// POST /accounts/:accountId/destinations
router.post('/accounts/:accountId', destinationController.createDestination);

// Get a destination by id
router.get('/:id', destinationController.getDestinationById);

// Update a destination by id
router.put('/:id', destinationController.updateDestination);

// DELETE /destinations/:id
router.delete('/:id', destinationController.deleteDestination);

module.exports = router;
