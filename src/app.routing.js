const router = require('express').Router();
const roomRouting = require('./module/room/room.routing');

router.get('/', (req, res) => { res.render('index.html'); });
router.use('/api', (req, res, next) => {
    return next();
});
router.use('/api/room', roomRouting);

module.exports = router;