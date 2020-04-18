const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    reference: {
        type: String,
        required: true,
        unique: true
    },
    online: Boolean,
    avatar: {
        type: String,
        required: false
    },
    lastConnection: Date,
    lastDisconnection: Date
});

module.exports = mongoose.model('User', userSchema);