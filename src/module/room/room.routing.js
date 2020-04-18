const router = require('express').Router();
const roomController = require('./room.controller');

router.get('/:id', roomController.get);
router.post('/', roomController.create);

module.exports = router;