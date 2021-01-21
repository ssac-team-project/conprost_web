const express = require('express');
const router = express.Router();

const TeamsController = require('../controllers/teamsController');

router.post('/',TeamsController.createTeams);
router.get('/projects/:projectIdx',TeamsController.showProjectTeams);

module.exports = router;