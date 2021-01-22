const TeamsModel = require('../models/teamsModel');
const pool = require('../modules/pool');
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
            if (projectIdx===null|| !partIdx || !team_name || !title || !description || !total) {
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

    deleteTeam: async(req,res)=>{ //팀삭제
        teamIdx = req.params.teamIdx;
        try{
            const result = await TeamsModel.deleteTeam(teamIdx);
            if(!result){
                return res.status(statusCode.OK).send(util.fail(statusCode.NOT_FOUND,resMessage.SHOW_TEAMS_FAIL));
            }
            else{
                return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_TEAMS_SUCCESS));
            }
        }catch(err){
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },

    showTeamlist: async(req,res) => {
        userIdx = req.params.userIdx;
        try{
            const result = await TeamsModel.showTeamlist(userIdx);
            if(!result){
                return res.status(statusCode.OK).send(util.fail(statusCode.NOT_FOUND,resMessage.SHOW_TEAMS_FAIL));
            }
            else{
                return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.SHOW_TEAM_LIST_SUCCESS,result));
            }
        }catch(err){
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },

    showDetailTeamBords:async(req,res) =>{
        teamIdx = req.params.teamIdx;
        try{
            const result = await TeamsModel.showDetailTeamBords(teamIdx);
            if(!result){
                return res.status(statusCode.OK).send(util.fail(statusCode.NOT_FOUND,resMessage.SHOW_TEAMS_FAIL));
            }
            else{
                return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.SHOW_TEAM_LIST_SUCCESS,result));
            }
        }catch(err){
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },

    applyTeam: async(req,res) =>{
        const {
            userIdx,
            teamIdx,
        } = req.body
        try {
            //같은 팀에 신청하는지 확인
           const apply = await TeamsModel.checkApply(userIdx);
           if(apply === userIdx){
               return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ALREADY_TEAM));
           } 
             const result = await TeamsModel.applyTeam(userIdx,teamIdx)
             return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.APPLY_TEAM_SUCCESS, result));

        }catch(err){
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },

    showProjectTeams: async(req,res) => {
        const projectIdx = req.params.projectIdx;
        try{
            const result = await TeamsModel.showProjectTeams(projectIdx);
            if(!result){
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.SHOW_TEAMS_FAIL));
            }else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SHOW_TEAMS_SUCCESS, result));
            }
        }catch(err){
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    }
    
}

module.exports = teams;