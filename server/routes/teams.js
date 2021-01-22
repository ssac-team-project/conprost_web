const express = require('express');
const router = express.Router();

const TeamsController = require('../controllers/teamsController');

router.post('/',TeamsController.createTeams);
router.post('/user',TeamsController.applyTeam);
router.delete('/trash/:teamIdx',TeamsController.deleteTeam);
router.get('/projects/:projectIdx',TeamsController.showProjectTeams);
router.get('/list/:userIdx',TeamsController.showTeamlist);

module.exports = router;