const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountControllers');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, accountController.createAccount);
router.get('/', verifyToken, accountController.getAllAccounts);
router.get('/:id', verifyToken, accountController.getAccountById);
router.put('/:id', verifyToken, isAdmin, accountController.updateAccount);
router.delete('/:id', verifyToken, isAdmin, accountController.deleteAccount);

module.exports = router;
