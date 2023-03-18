const express = require('express');
const router = express.Router();

const TeamsController = require('../controllers/teamsController');


router.get('/detail/projects/:categoryIdx/:projectIdx',TeamsController.showDetailProject);
router.get('/list/projects/:projectIdx',TeamsController.showProjectInfo);
router.get('/list/team/:teamIdx',TeamsController.showDetailTeamBoards);
router.get('/list',TeamsController.showTeamsList);
router.get('/list/:userIdx',TeamsController.showTeamlist);
router.get('/detail/:categoryIdx/:projectIdx',TeamsController.showDetailProject); 
router.get('/projects/filter/:filterIdx',TeamsController.showProjectFilter); //프로젝트 모델로
router.get('/scrap/:userIdx',TeamsController.showScrap); //유저모델로

router.post('/',TeamsController.createTeams);
router.post('/user',TeamsController.applyTeam);
router.post('/scrap',TeamsController.addScrap); //프로젝트 모델로

router.put('/contribution/:userIdx',TeamsController.evaluateUser); 

router.delete('/trash/:teamIdx',TeamsController.deleteTeam);


module.exports = router;