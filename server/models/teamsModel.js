const pool = require('../modules/pool');
const TEAM = 'Team'; // Team Table
const TEAMUSER = 'TeamUser'; // TeamUser Table
const PART = 'Part'; // Part Table
const USER = 'User'; // User Table
const PROJECT = 'Project'; //Project Table

const teams = {
    //프로젝트 정보 뷰) 팀 만들기
    createTeams: async(projectIdx,team_name,title,description,total) => {
        const fields = "id,team_name,title,description,total";
        const questions = '?,?,?,?,?';
        //팀 만들 시 Part테이블에 개발분야와 인원 수를 전달해야함
        const values = [projectIdx,partIdx,team_name,title,description,total];
        const query = `INSERT INTO ${TEAM}(${fields}) VALUES (${questions})`;
        
    try {
        const result = await pool.queryParamArr(query,values);
        const insertId = result.insertId;
        return insertId; //이거를 api하나 더 만들어서 밑에다가 파라미터로 추가
    } 
      catch (err) {
        console.log('createTeam ERROR: ', err);
        throw err;
        }
    },

    //프로젝트 정보 뷰) 팀 신청하기
    applyTeam: async(userIdx,teamIdx) => {
        const fields = "userId,teamId";
        const questions = '?,?';
        const values = [userIdx,teamIdx];
        const query = `INSERT INTO ${TEAMUSER}(${fields}) VALUES(${questions})`;
        const addquery = `UPDATE ${TEAM} t SET participants = participants + 1 WHERE t.team = ${teamIdx}`;
        try{
            await pool.queryParam(addquery);
            const result = await pool.queryParamArr(query,values);
            return result;
        }
        catch(err){
            console.log('applyTeam ERROR: ', err);
            throw err;
        }
    },

    // 팀 게시판 뷰) 상호 평가
    evaluateUser: async(score,userIdx)=>{
        const query = `UPDATE ${USER} u SET contribution = IFNULL(contribution,0) + "${score}" WHERE u.id = ${userIdx} `;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('evaluateUser ERROR: ', err);
            throw err;
        }
    },

    //팀 게시판 뷰) 게시판 리스트 조회
    showTeamlist: async(userIdx)=>{ //User가 속한 팀의 이름과 타이틀을 보여준다
        const query = `SELECT t.team_name, t.title
                       FROM ${TEAM} t INNER JOIN ${TEAMUSER} tu on t.id = tu.teamId
                       INNER JOIN ${USER} u on tu.userId = u.id
                       WHERE u.id = ${userIdx}`;
        try{
            result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('showTeamlist ERROR ', err);
            throw err;
        }
    },
    
    //팀 게시판 뷰) 게시판 세부 조회
    showDetailTeamBoards: async(teamIdx)=>{ //팀원 목록과 프로젝트 소개를 보여준다.
        const query = `SELECT t.description, u.user_name
                       FROM ${TEAM} t INNER JOIN ${TEAMUSER} tu on t.id = tu.teamId
                       INNER JOIN ${USER} u on tu.userId = u.id
                       WHERE t.id = ${teamIdx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('showTeamBords ERROR: err');
            throw err;
        }
    },

    /*//프로젝트 정보 뷰) 팀 구인글 조회
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
    },*/

    // 프로젝트 정보 뷰) 팀 구인글 조회
    showGetProject: async (categoryIdx) => { // 프로젝트/스타트업 팀 구인글 조회
        // 프로젝트/스타트업 이름, 본문 & 팀 총 인원, 팀 현재 인원,팀 이름 
        const query = `SELECT t.total, t.participants, t.team_name
                       FROM ${PROJECT} p , ${TEAM} t
                       WHERE p.categoryIdx = ${categoryIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('showGetContent ERROR: ', err);
            throw err;
        }
    },

    // 게시판 세부정보 조회로 나누어놓기
    showGetContest: async (categoryIdx,projectIdx) => { // 공모전/해커톤 팀 구인글 조회
        const query = `SELECT p.project_name, p.description, p.img_url, t.team_name, t.title, t.description, t.total, t.participants 
                       FROM ${PROJECT} p INNER JOIN Team t ON t.projectId = p.id
                       WHERE p.categoryIdx = ${categoryIdx} And p.id = ${projectIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('showGetProject ERROR: ', err);
            throw err;
        }
    },

    // 팀 삭제
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
        const query = `SELECT u.id
                       FROM ${TEAM} t INNER JOIN ${TEAMUSER} tu on t.id = tu.teamId
                       INNER JOIN ${USER} u on tu.userId = u.id
                       WHERE u.id = ${userIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            console.log('checkTeam ERROR: ', err);
        }
    }

}


module.exports = teams;