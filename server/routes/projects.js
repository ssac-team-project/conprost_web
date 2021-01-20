var express = require('express');
var router = express.Router();

const ProjectsController = require('../controllers/projectsController');

router.get('/:categoryIdx', ProjectsController.showProjects);
router.get('/search/:keyword', ProjectsController.searchByKeyword);
router.get('/detail/:projectIdx',ProjectsController.showDetailProject);
router.put('/period/:projectIdx', ProjectsController.updateProjectPeriod);

module.exports = router;