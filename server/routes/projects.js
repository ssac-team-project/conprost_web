var express = require('express');
var router = express.Router();

const ProjectsController = require('../controllers/projectsController');

router.get('/:categoryIdx', ProjectsController.showProjects);
router.get('/search/:keyword', ProjectsController.searchByKeyword);

module.exports = router;