const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { res.render('index.html'); });
router.use('/api', require('./service/authorization.service').validate);
router.use('/api', express.json());

router.use('/api/room', require('./module/room/room.routing'));
router.use('/api/user', require('./module/user/user.routing'));

module.exports = router;