const express = require('express');
const roomRouting = require('./module/room/room.routing');
const router = express.Router();

router.get('/', (req, res) => { res.render('index.html'); });
router.use('/api', express.json());
router.use('/api/room', roomRouting);

module.exports = router;