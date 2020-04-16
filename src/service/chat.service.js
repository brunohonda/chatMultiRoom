module.exports = {
    start: function(app) {
        const sockets = require('socket.io')(app);
        const ChatController = require('../controller/chat.controller')(sockets);
        sockets.on('connection', ChatController.connection);
    }
}