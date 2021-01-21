const pool = require('../modules/pool');
const TEAM = 'Team'; // Team Table
const TEAMUSER = 'TeamUser';

const teams = {
    createTeams: async(projectIdx,partIdx,team_name,title,description,total) => {
        const info = "project,part,team_name,title,description,total";
        const insert = '?,?,?,?,?,?';
        const values = [projectIdx,partIdx,team_name,title,description,total]
        const query = `INSERT INTO ${TEAM}(${info}) VALUES (${insert})`;
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

    applyTeam: async(user) => {
        const query = `INSERT INTO TeamUser VALUES(${user})`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }
        catch(err){
            console.log('applyTeam ERROR: ', err);
            throw err;
        }
    },

    showProjectTeams: async(projectIdx)=>{
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

    checkTeam: async(team_name) => {
        const query = `SELECT team_name
                       FROM ${TEAM}
                       WHERE team_name = "${team_name}"`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch(err){
            console.log('checkTeam ERROR: ', err);
        }
    }

}


module.exports = teams;