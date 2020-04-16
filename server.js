require('dotenv').config();
require('./src/service/database.service');
const config = require('./src/config');

const app = require('./src/app');
const sockets = require('socket.io')(app);

const Room = require('./src/model/room');
const User = require('./src/model/user');

sockets.on('connection', async (socket) => {
    const user = await User.findOneAndUpdate(
        { internalReference: socket.handshake.query.user },
        {},
        { upsert: true, new: true }
    );
    
    const room = await Room.findByIdAndUpdate(
        socket.handshake.query.room,
        { $addToSet: { users: user } },
        { upsert: true, new: true }
    );

    const users = await User.find({ _id: { $in: room.users }});
    
    socket.join(room._id);
    sockets.to(room._id).emit('roomUsers', users);
    
    socket.on('message', (data) => {
        sockets.to(socket.handshake.query.room).emit('response', data);
    });
});

app.listen(config.app.port, () => {
    console.log(`Listen port ${config.app.port}`);
});