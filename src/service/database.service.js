const config = require('../config');
const mongoose = require('mongoose');

mongoose.connect(
    `mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
console.log(mongoose.connection.readyState);

module.exports = mongoose.connection;