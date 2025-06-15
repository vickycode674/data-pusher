const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountControllers');
const mockAuth = require('../middleware/mockAuth'); // ✅ import mock auth
const isTest = process.env.NODE_ENV === 'test';

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const useAuth = isTest ? mockAuth : verifyToken;
console.log("what is useAth===============",isTest);


router.post('/', verifyToken, accountController.createAccount);
router.get('/', verifyToken, accountController.getAllAccounts);
router.get('/:id', verifyToken, accountController.getAccountById);
router.put('/:id', verifyToken, isAdmin, accountController.updateAccount);
router.delete('/:id', verifyToken, isAdmin, accountController.deleteAccount);

module.exports = router;
