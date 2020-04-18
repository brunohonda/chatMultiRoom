const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
    validate: (req, res, next) => {
        const authorizationHeader = req.header('authorization');
        if (!authorizationHeader) {
            res.status(401).json({ message: 'Not authorization header found' });
            return;
        }

        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Not authorization token found' });
            return;
        }
        try {
            req.jwt = jwt.verify(token, config.jwt.secret);
            next();
        } catch(error) {
            res.status(401).json({ message: 'Not authorized' });
        }
    }
};