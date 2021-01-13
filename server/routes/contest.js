var express = require('express');
var router = express.Router();

const ContestController = require('../controllers/contestController');

router.get('/detail/:contestIdx', ContestController.showContestDetail);
router.get('/recruit/:contestIdx', ContestController.showTeamRecruitmentList);


module.exports = router;