require('dotenv').config();
const config = require('./src/config');

const app = require('./src/app');
const sockets = require('socket.io')(app);

sockets.on('connection', (socket) => {
    socket.join(socket.handshake.query.room);

    socket.on('message', (data) => {
        sockets.to(socket.handshake.query.room).emit('response', data);
    });
});

app.listen(config.app.port, () => {
    console.log(`Listen port ${config.app.port}`);
});