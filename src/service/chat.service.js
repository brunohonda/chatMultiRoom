module.exports = {
    start: function(app) {
        const sockets = require('socket.io')(app);
        const ChatController = require('../module/chat.controller')(sockets);
        sockets.on('connection', ChatController.connection);
    }
}