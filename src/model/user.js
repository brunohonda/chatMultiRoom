const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    internalReference: {
        type: String,
        required: true,
        unique: true
    },
    online: Boolean,
    avatar: {
        type: String,
        required: false
    },
    lastConnection: {
        type: Date,
        default: Date.now
    },
    lastDisconnection: {
        reason: String,
        datetime: Date
    }
});

module.exports = mongoose.model('User', userSchema);