const Room = require('../model/room');
const User = require('../model/user');

module.exports = {
    start: function(app) {
        const sockets = require('socket.io')(app);
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
    }
}