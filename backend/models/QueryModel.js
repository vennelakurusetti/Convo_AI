const mongoose = require('mongoose');

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
