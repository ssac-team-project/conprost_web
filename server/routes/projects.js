var express = require('express');
var router = express.Router();

const ProjectsController = require('../controllers/projectsController');

router.get('/all', ProjectsController.showProjects);

module.exports = router;