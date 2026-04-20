const express = require('express');
const { body } = require('express-validator');
const { handleAsk } = require('../controllers/askController');

const router = express.Router();

router.post(
    '/ask',
    [
        body('question').notEmpty().withMessage('Question is required').isString()
    ],
    handleAsk
);

module.exports = router;
