const express = require('express');
const router = express.Router();
const accountMemberController = require('../controllers/accountMemberController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, accountMemberController.addMember);
router.get('/', verifyToken, accountMemberController.getAllMembers);

module.exports = router;
