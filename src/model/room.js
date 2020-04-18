const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    reference: {
        type: String,
        required: false,
        unique: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    messages: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
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