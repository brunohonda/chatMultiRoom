const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: new Date()
        }
    }]
});

module.exports = mongoose.model('Room', roomSchema);