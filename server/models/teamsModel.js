const pool = require('../modules/pool');
const TEAM = 'Team'; // Team Table
const TEAMUSER = 'TeamUser'; // TeamUser Table
const PART = 'Part'; // Part Table
const USER = 'User'; // User Table
const PROJECT = 'Project'; //Project Table

const teams = {
    //프로젝트 정보 뷰) 팀 만들기
    createTeams: async(projectIdx,team_name,title,description,total) => {
        const fields = "projectId,team_name,title,description,total";
        const questions = '?,?,?,?,?';
        //팀 만들 시 Part테이블에 개발분야와 인원 수를 전달해야함
        const values = [projectIdx,team_name,title,description,total];
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

    createPart: async(insertId,part_name,required_nums) =>{
        const fields = "teamId,part_name,required_nums";
        const questions = '?,?,?';
        const values = [insertId,part_name,required_nums];
        const query = `INSERT INTO ${PART}(${fields}) VALUES (${questions})`;

     try {
         await pool.queryParamArr(query,values);
    } 
      catch (err) {
        console.log('createPart ERROR: ', err);
        throw err;
        }
    },

    //프로젝트 정보 뷰) 팀 신청하기
    applyTeam: async(userIdx,teamIdx,part_name) => {
        const fields = "userId,teamId";
        const questions = '?,?';
        const values = [userIdx,teamIdx];
        const query = `INSERT INTO ${TEAMUSER}(${fields}) VALUES(${questions})`;
        const addquery = `UPDATE ${TEAM} t SET participants = participants + 1 WHERE t.id = ${teamIdx}`;
        const subquery = `UPDATE ${PART} p SET required_nums = required_nums - 1 
                          WHERE p.teamId = ${teamIdx} AND p.part_name = "${part_name}"`;
        try{
            await pool.queryParam(subquery);
            await pool.queryParam(addquery);
            const result = await pool.queryParamArr(query,values);
            return result;
        }
        catch(err){
            console.log('applyTeam ERROR: ', err);
            throw err;
        }
    },

    //프로젝트 정보 뷰) 세부 정보 조회
    showProjectInfo: async(projectIdx) =>{
        const query = `SELECT * FROM ${PROJECT} WHERE PROJECT.id = ${projectIdx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('showProjectInfo ERROR: ',err);
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
    showGetProject: async (categoryIdx,projectIdx) => { // 프로젝트/스타트업 팀 구인글 조회
        // 프로젝트/스타트업 이름, 본문 & 팀 총 인원, 팀 현재 인원,팀 이름 
        const query = `SELECT t.team_name,  t.title, t.description, t.total, t.participants
                       FROM ${PROJECT} p , ${TEAM} t
                       WHERE p.categoryIdx = ${categoryIdx} And p.id = ${projectIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('showGetContent ERROR: ', err);
            throw err;
        }
    },
    showGetContest: async (categoryIdx,projectIdx) => { // 공모전/해커톤 팀 구인글 조회
        const query = `SELECT t.team_name, t.title, t.description, t.total, t.participants 
                       FROM ${PROJECT} p INNER JOIN ${TEAM} t ON t.projectId = p.id
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

    addScrap: async(userIdx,projectIdx) =>{
        const fields = "userId,projectId";
        const questions = '?,?';
        const values = [userIdx,projectIdx];
        const query = `INSERT INTO ${PROJECT}(${fields}) VALUES (${questions}) `;
        const addquery = `UPDATE SET scrap = IFNULL(scrap,0) + 1 WHERE p.id = ${projectIdx}`;
        try{
            await pool.queryParam(addquery);
            const result = await pool.queryParamArr(query,values);
            return result;
        }catch(err)
        {
            console.log('addScrap ERROR: ', err);
        }
    },

    showNewFilter: async() => {
        const query = `SELECT * FROM ${PROJECT} p ORDER BY p.created_at DESC`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('showNewFilter ERROR: ',err);
            throw err;
        }
    },

    showPopulaFilter: async() =>{
        const query = `SELECT * FROM ${PROJECT} p ORDER BY p.scrap DESC`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('showPopularFilter ERROR: ',err);
            throw err;
        }
    },

    showPeriodFilter: async() =>{
        const query = `SELECT * FROM ${PROJECT} p ORDER BY p.period DESC`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('showPeriodFilter ERROR: ',err);
            throw err;
        }
    },

    showScrap: async(userIdx) => {
        const query = `SELECT p.project_name
                       FROM User u INNER JOIN Scrap s on u.id = s.userId
                       INNER JOIN Project p on s.projectId = p.id
                       WHERE u.id = ${userIdx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('showScrap ERROR: ',err);
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