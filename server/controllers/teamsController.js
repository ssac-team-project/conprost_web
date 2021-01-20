const TeamsModel = require('../models/teamsModel');
const resMessage = require('../modules/resMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');

const teams = {
    createTeams: async (req,res) => {

        let teaminfo = 
         [ req.body.projectIdx,
           req.body.partIdx,
           req.body.team_name,
           req.body.title,
           req.body.description,
           req.body.total
         ]
        try {
            const result = await TeamsModel.createTeams(teaminfo);
            console.log(result);
            if (!result) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.TEAM_RECRUITMENT_FAIL));
            } 
            else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.TEAM_RECRUITMENT_SUCCESS, result));
            }
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    }}

module.exports = teams;