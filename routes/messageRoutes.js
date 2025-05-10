const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getMessages } = require('../controllers/messageController');
router.get('/', getMessages);
module.exports = router;
