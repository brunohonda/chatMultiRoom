const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
    validate: (req, res, next) => {
        const authorizationHeader = req.header('authorization');
        if (!authorizationHeader) {
            return res.status(401).json({ message: 'Not authorization header found' });
        }

        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Not authorization token found' });
        }
        try {
            req.jwt = jwt.verify(token, config.jwt.secret);
            next();
        } catch(error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: 'Session expired' });
            }

            res.status(401).json({ message: 'Not authorized' });
        }
    }
};