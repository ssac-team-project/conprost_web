var express = require('express');
var router = express.Router();

const ContestController = require('../controllers/contestController');

router.post('/register', ContestController.register);

// 세부 정보 조회
router.get('/detail/:contestIdx', ContestController.showContestDetail);

// 팀 구인 글 조회
router.get('/recruit/:contestIdx', ContestController.showTeamRecruitmentList);

// 팀 리스트 update
// router.put('/list/:contestIdx', ContestController.updateTeamList);
module.exports = router;