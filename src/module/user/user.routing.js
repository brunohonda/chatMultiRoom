const router = require('express').Router();
const userController = require('./user.controller');

router.post('/', userController.create);

module.exports = router;