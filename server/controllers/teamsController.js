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
           total,
          } = req.body;
        try {  
            // 팀 정보값 누락
            if (projectIdx===null|| !partIdx || !team_name || !title || !description || !total ) {
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

    evaluateUser: async(req,res)=>{ //User모델로 옮길것

        const {score} = req.body;
        const userIdx = req.params.userIdx;
        
        try{
            const result = await TeamsModel.evaluateUser(score,userIdx);
            if(!result){
                return res.status(statusCode.OK).send(util.fail(statusCode.NOT_FOUND,resMessage.NO_USER));
            }
            else{
                return res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.EVALUATE_SUCCESS,result));
            }
        }catch(err){
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },



    deleteTeam: async(req,res)=>{ //팀삭제
        const teamIdx = req.params.teamIdx;
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
        const userIdx = req.params.userIdx;
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
        const teamIdx = req.params.teamIdx;
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
            teamIdx
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

    showDetailProject : async (req, res) => {
        const categoryIdx = req.params.categoryIdx;
        const projectIdx = req.params.projectIdx;
        try {
            // 0 = 프로젝트/스타트업이라 가정 , 1 = 공모전/해커톤이라 가정 
            // 프로젝트/스타트업일 경우
            if(categoryIdx == 0)
            {
                const result = await TeamsModel.showGetProject(categoryIdx);
                if (!result) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.PROJECT_DETAIL_FAIL));
                } else if (result.length === 0) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NO_CONTENT));
                } else {
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.PROJECT_DETAIL_SUCCESS, result));
                }
            }
            // 공모전/해커톤일 경우
            else if (categoryIdx == 1)
            {
                const result = await TeamsModel.showGetContest(categoryIdx,projectIdx);
                if (!result) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.CONTEST_DETAIL_FAIL));
                } else if (result.length === 0) {
                    return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NO_CONTENT));
                } else {
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CONTEST_DETAIL_SUCCESS, result));
                }
            }
            
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },

    /* //프로젝트 정보 뷰) 팀 구인 글 조회
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
    }*/
    
}

module.exports = teams;