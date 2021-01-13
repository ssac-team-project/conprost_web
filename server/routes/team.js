const express = require('express');
const router = express.Router();

const TeamController = require('../controllers/teamController');

router.post('/createteam', TeamController.createTeam);
router.post('/applyteam', TeamController.applyTeam);


module.exports = router;