const TeamsModel = require('../models/teamsModel');
const resMessage = require('../modules/resMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');

const teams = {
    createTeams: async (req,res) => {

        const 
         { 
           projectIdx,
           partIdx,
           team_name,
           title,
           description,
           total
          } = req.body;
        try {  
            // 팀 정보값 누락
            if (!projectIdx || !partIdx || !team_name || !title || !description || !total) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
            }
            // 중복 팀명 확인
            const teamname = await TeamsModel.checkTeam(team_name);
            if(teamname.length > 0 ){
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ALREADY_TEAM_NAME));
            }
                const result = await TeamsModel.createTeams(projectIdx,partIdx,team_name,title,description,total);
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.TEAM_RECRUITMENT_SUCCESS, result));
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
            }
    },
    /*applyTeam: async(req,res) =>{
        const {
            user,
            team
        } = req.body
        try {
            
        }
    }*/
    showProjectTeams: async(req,res) => {
        const projectIdx = req.params.projectIdx;
        try{
            const result = await TeamsModel.showProjectTeams(projectIdx);
            if(!result){
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NO_PROJECT));
            }else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SHOW_PROJECTS_SUCCESS, result));
            }
        }catch(err){
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    }
    
}

module.exports = teams;