const express = require('express');
const router = express.Router();

const destinationController = require('../controllers/destinationController');

router.post('/accounts/:accountId', destinationController.createDestination);

router.get('/:id', destinationController.getDestinationById);

router.put('/:id', destinationController.updateDestination);

router.delete('/:id', destinationController.deleteDestination);

module.exports = router;
