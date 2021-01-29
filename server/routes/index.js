const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/projects', require('./projects'));
router.use('/teams',require('./teams'));
router.use('/users',require('./users'));

module.exports = router;
