var express = require('express');
var router = express.Router();

const UsersController = require('../controllers/usersController');
const AuthMiddleware = require('../middlewares/auth');

router.post('/signup', UsersController.signUp);
router.post('/signin', UsersController.signIn);

router.get('/profile', AuthMiddleware.checkToken, UsersController.showProfile);
router.get('/teamname', AuthMiddleware.checkToken, UsersController.showTeamName);

module.exports = router;
