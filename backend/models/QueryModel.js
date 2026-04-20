const mongoose = require('mongoose');

/**
 * @typedef {Object} Query
 * @property {string} question - The user's input query.
 * @property {string} response - The AI-generated answer.
 * @property {Date} createdAt - The timestamp when the query was created.
 * @property {Date} updatedAt - The timestamp when the query was last updated.
 */

/**
 * Mongoose Schema for AI queries and responses.
 * @type {import('mongoose').Schema<Query>}
 */
const QuerySchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required'],
        trim: true
    },
    response: {
        type: String,
        required: [true, 'Response is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Query', QuerySchema);
