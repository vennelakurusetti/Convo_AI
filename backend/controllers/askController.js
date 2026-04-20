const { validationResult } = require('express-validator');
const { getAIResponse } = require('../services/groqService');
const Query = require('../models/QueryModel');

/**
 * Handles the 'ask' endpoint by validating input, fetching AI response,
 * and saving the query to the database.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
const handleAsk = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { question } = req.body;

    try {
        const response = await getAIResponse(question);

        const newQuery = new Query({
            question,
            response
        });

        await newQuery.save();

        res.status(200).json({
            question,
            response
        });
    } catch (error) {
        console.error('Controller Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { handleAsk };
