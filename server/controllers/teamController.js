const teamModel = require('../models/teamModel');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const resMessage = require('../modules/resMessage');


const team = {

    createTeam: async (req, res) => {
        const team = req.body;

        try {
            await teamModel.createTeam(team);
            return res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, resMessage.CREATE_TEAM_SECCESS));

        } catch (err) {
            console.log(err);
            return res.status(statusCode.BAD_REQUEST.send(util.fail(statusCode.BAD_REQUEST, resMessage.CREATE_TEAM_FAIL)))
        }
    },

    applyTeam: async (req, res) => {
        const apply = req.body;

        try {
            await teamModel.applyTeam(apply);
            return res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, resMessage.CREATE_TEAM_SECCESS));

        } catch (err) {
            console.log(err);
            return res.status(statusCode.BAD_REQUEST.send(util.fail(statusCode.BAD_REQUEST, resMessage.CREATE_TEAM_FAIL)))
        }
    }
    
}

module.exports = team;