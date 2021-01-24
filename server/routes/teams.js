const express = require('express');
const router = express.Router();

const TeamsController = require('../controllers/teamsController');

//router.get('/projects/:projectIdx',TeamsController.showProjectTeams);
router.get('/list/team/:teamIdx',TeamsController.showDetailTeamBords);
router.get('/list/:userIdx',TeamsController.showTeamlist);
router.get('/detail/:categoryIdx/:projectIdx',TeamsController.showDetailProject);

router.post('/',TeamsController.createTeams);
router.post('/user',TeamsController.applyTeam);

router.put('/contribution/:userIdx',TeamsController.evaluateUser);

router.delete('/trash/:teamIdx',TeamsController.deleteTeam);


module.exports = router;