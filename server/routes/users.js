var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/usersController');

router.post('/signin', UsersController.signIn);

module.exports = router;
