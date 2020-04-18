const Room = require('../model/room');
const User = require('../model/user');

function findUser(socket) {
    if (!socket.handshake.query.user) {
        throw new Error('Identity not informed');
    }

    return User.findOneAndUpdate(
        { reference: socket.handshake.query.user },
        { lastConnection: new Date() },
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
        user.updateOne({ online: room });
        
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
            
            socket.on('message', async (data) => {
                Room.findByIdAndUpdate(
                    socket.handshake.query.room,
                    {
                        $push: {
                            messages: {
                                $each: [{ user: { _id: '5e9a4d4f9d4c2d0006edb33a' }, text: data.message }]
                            }
                        }
                    }
                );
                sockets.to(socket.handshake.query.room).emit('response', data);
            });
        }
    };
}