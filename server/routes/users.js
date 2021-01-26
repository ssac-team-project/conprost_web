var express = require('express');
var router = express.Router();

const upload = require('../modules/multer');

const UsersController = require('../controllers/usersController');
const AuthMiddleware = require('../middlewares/auth');

router.post('/signup', UsersController.signUp);
router.post('/signin', UsersController.signIn);

router.get('/profile', AuthMiddleware.checkToken, UsersController.showProfile);
router.get('/teamname', AuthMiddleware.checkToken, UsersController.showTeamName);

router.get('/intro', AuthMiddleware.checkToken, UsersController.showIntro);
router.put('/image', AuthMiddleware.checkToken, upload.single('image'), UsersController.updateProfileImg);

module.exports = router;
