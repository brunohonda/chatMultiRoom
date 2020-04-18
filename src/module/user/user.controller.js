const User = require('../../model/user');
const mongoogse = require('mongoose');

module.exports = {
    async create(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { reference: req.body.reference },
                req.body,
                { upsert: true, new: true }
            );
            res.json(user);
        } catch (error) {
            if (error instanceof mongoogse.Error.ValidationError) {
                const errors = [];
                Object.keys(error.errors).forEach(key => {
                    errors.push({
                        attribute: key,
                        message: error.errors[key].message
                    });
                });

                return res.status(400).json({ message: 'Invalid data', errors });
            }

            throw error;
        }
    },
    async get(req, res) {
        const user = await User
            .findById(req.params.id);

        if (user) {
            res.json(user);
            return;
        }
            
        res.status(404).json({ message: `User ${req.params.id} not found` });
    }
};