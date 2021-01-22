const pool = require('../modules/pool');
const TEAM = 'Team'; // Team Table
const TEAMUSER = 'TeamUser';
const PART = 'Part';
const USER = 'User';

const teams = {
    createTeams: async(projectIdx,partIdx,team_name,title,description,total) => {
        const fields = "project,part,team_name,title,description,total";
        const questions = '?,?,?,?,?,?';
        //팀 만들 시 Part테이블에 개발분야와 인원 수를 전달해야함
        const values = [projectIdx,partIdx,team_name,title,description,total];
        const query = `INSERT INTO ${TEAM}(${fields}) VALUES (${questions})`;
        
    try {
        const result = await pool.queryParamArr(query,values);
        const insertId = result.insertId;
        return insertId; //여기서 얻은 Id값을 TeamUser 테이블에 저장하고 싶은데 어떻게 해야 할까요...?
    } 
      catch (err) {
        console.log('createTeam ERROR: ', err);
        throw err;
        }
    },

    applyTeam: async(userIdx,teamIdx) => {
        const fields = "user,team,part";
        const questions = '?,?';
        // 팀 신청시 Team테이블의 현재인원수를 수정해야한다.
        const values = [userIdx,teamIdx];
        const query = `INSERT INTO ${TEAMUSER}(${fields}) VALUES(${questions})`;
        try{
            const result = await pool.queryParamArr(query,values);
            return result;
        }
        catch(err){
            console.log('applyTeam ERROR: ', err);
            throw err;
        }
    },

    showTeamlist: async(userIdx)=>{ //User가 속한 팀의 이름과 타이틀을 보여준다
        const query = `SELECT t.team_name, t.title
                       FROM ${TEAM} t INNER JOIN ${TEAMUSER} tu on t.team = tu.team
                       INNER JOIN ${USER} u on tu.user = u.user
                       WHERE u.user = ${userIdx}`;
        try{
            result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('showTeamlist ERROR ', err);
            throw err;
        }
    },
    
    showDetailTeamBords: async(teamIdx)=>{ //팀원 목록과 프로젝트 소개를 보여준다.
        const query = `SELECT t.description, u.user_name
                       FROM ${TEAM} t INNER JOIN ${TEAMUSER} tu on t.team = tu.team
                       INNER JOIN ${USER} u on tu.user = u.user
                       WHERE t.team = ${teamIdx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('showTeamBords ERROR: err');
            throw err;
        }
    },

    showProjectTeams: async(projectIdx)=>{ // 팀 구인글 조회
        const query = `SELECT team_name, title, description,total,participants
                       FROM ${TEAM} 
                       WHERE project = ${projectIdx};`; 
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('showProjectTeams ERROR: ', err);
            throw err;
        }
    },
    deleteTeam: async(teamIdx) =>{
        const query = `DELETE FROM ${TEAM} WHERE ${teamIdx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('deleteTeam ERROR: ',err);
            throw err;
        }
    },

    checkTeam: async(team_name) => { // 중복 팀명 체크
        const query = `SELECT team_name
                       FROM ${TEAM}
                       WHERE team_name = "${team_name}"`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            console.log('checkTeam ERROR: ', err);
        }
    },
    
    checkApply: async(userIdx) => { // User가 팀 신청을 했던 팀에 중복 신청하는지 체크한다
        const query = `SELECT u.user
                       FROM ${TEAM} t INNER JOIN ${TEAMUSER} tu on t.team = tu.team_user
                       INNER JOIN ${USER} u on tu.user = u.user
                       WHERE t.team = ${userIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            console.log('checkTeam ERROR: ', err);
        }
    }

}


module.exports = teams;