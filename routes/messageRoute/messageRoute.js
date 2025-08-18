const express = require('express');
const router = express.Router();
const {
    createMessage,
    getMessages,
    getMessage,
    updateStatus
} = require('../../controller/messageController/messageController');

// POST /api/contacts
router.post('/', createMessage);

// GET /api/contacts
router.get('/', getMessages);

// GET /api/contacts/:id
router.get('/:id', getMessage);

// PATCH /api/contacts/:id
router.patch('/:id', updateStatus);

module.exports = router;