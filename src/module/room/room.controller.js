const Room = require('../../model/room');

module.exports = {
    async create(req, res) {
        const room = await Room.create({});
        res.json({ room: room._id});
    },
    async get(req, res) {
        const room = await Room
            .findById(req.params.id);

        if (room) {
            res.json(room);
            return;
        }
            
        res.status(404).json({ message: `Room ${req.params.id} not found` });
    }
};