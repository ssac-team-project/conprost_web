const express = require('express');
const router = express.Router();
const teamRouter = require('./routes/team');
const usersRouter = require('./routes/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/contest', require('./contest'));
router.use('/team',teamRouter);
router.use('/users', usersRouter);

module.exports = router;
