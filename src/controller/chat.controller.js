const Room = require('../model/room');
const User = require('../model/user');

module.exports = (sockets) => {
    return {
        connection: async (socket) => {
            const user = await User.findOneAndUpdate(
                { internalReference: socket.handshake.query.user },
                { internalReference: socket.handshake.query.user },
                { upsert: true, new: true }
            );

            let room;
            
            try {
                room = await Room.findByIdAndUpdate(
                    socket.handshake.query.room,
                    { $addToSet: { users: user } },
                    { upsert: true, new: true }
                );
            } catch(e) {
                socket.disconnect(true);
                return;
            }

            const users = await User.find({ _id: { $in: room.users }});
            
            socket.join(room._id).emit('roomUsers', users);
            
            socket.on('message', (data) => {
                sockets.to(socket.handshake.query.room).emit('response', data);
            });
        }
    };
}