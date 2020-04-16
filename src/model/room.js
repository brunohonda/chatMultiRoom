const mongoose = require('mongoose');
const User = require('./user');

const roomSchema = mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }]
});

module.exports = mongoose.model('Room', roomSchema);