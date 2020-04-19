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
        
        await user.updateOne({ online: room });
        const users = await User.find({ _id: { $in: room.users }});
        const namespace = await socket.join(room._id).emit('roomUsers', users);

        socket.to(socket.handshake.query.room).emit('roomUsers', users);
        return { namespace, room, user };
    } catch(error) {
        socket.disconnect(true);
    }
}

function disconnect(sockets, socket, room, user) {
    return async (reason) => {
        await user.updateOne({ online: undefined, lastDisconnection: new Date() });
        sockets.to(room._id).emit('userLeave', user);
    };
}

module.exports = (sockets) => {
    return {
        connection: async (socket) => {
            const { room, user } = await joinToRoom(socket);

            socket.on('disconnect', disconnect(sockets, socket, room, user));
            
            socket.on('message', async (data) => {
                await Room.findByIdAndUpdate(
                    socket.handshake.query.room,
                    {
                        $push: {
                            messages: {
                                $each: [{ user, text: data.message }]
                            }
                        }
                    }
                );
                sockets.to(socket.handshake.query.room).emit('response', data);
            });
        }
    };
}