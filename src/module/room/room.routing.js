const router = require('express').Router();
const controller = require('./room.controller');

router.get('/', controller.create);

module.exports = router;