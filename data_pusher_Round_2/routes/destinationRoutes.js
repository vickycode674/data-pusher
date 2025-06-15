const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, destinationController.createDestination);
router.get('/', verifyToken, destinationController.getAllDestinations);
router.get('/:id', verifyToken, destinationController.getDestinationById);
router.put('/:id', verifyToken, destinationController.updateDestination);
router.delete('/:id', verifyToken, destinationController.deleteDestination);

module.exports = router;
