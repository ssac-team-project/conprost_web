var express = require('express');
var router = express.Router();

const upload = require('../modules/multer');

const ProjectsController = require('../controllers/projectsController');

router.post('/project', upload.single('image'), ProjectsController.createProject);
router.get('/:categoryIdx', ProjectsController.showProjects);
router.get('/search/:keyword', ProjectsController.searchByKeyword);
router.put('/period/:projectIdx', ProjectsController.updateProjectPeriod);

module.exports = router;