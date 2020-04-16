const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    internalReference: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);