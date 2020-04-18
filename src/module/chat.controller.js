const Room = require('../model/room');
const User = require('../model/user');

function findUser(socket) {
    if (!socket.handshake.query.user) {
        throw new Error('Identity not informed');
    }

    return User.findOneAndUpdate(
        { reference: socket.handshake.query.user },
        { online: true, lastConnection: new Date() },
        { upsert: true, new: true }
    );
}

function findRoom(socket, user) {
    if (!socket.handshake.query.room) {
        throw new Error('Room not found');
    }

    return Room.findByIdAndUpdate(
        socket.handshake.query.room,
        { $addToSet: { users: user } },
        { upsert: true, new: true }
    );
}

async function joinToRoom(socket) {
    try {
        const user = await findUser(socket);
        const room = await findRoom(socket, user);
        const users = await User.find({ _id: { $in: room.users }});
        const namespace = await socket.join(room._id).emit('roomUsers', users);
        
        socket.to(socket.handshake.query.room).emit('roomUsers', users);
        return namespace;
    } catch(error) {
        socket.disconnect(true);
    }
}

module.exports = (sockets) => {
    return {
        connection: async (socket) => {
            await joinToRoom(socket);
            
            socket.on('message', (data) => {
                sockets.to(socket.handshake.query.room).emit('response', data);
            });
        }
    };
}