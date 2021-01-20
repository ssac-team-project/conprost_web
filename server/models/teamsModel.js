const pool = require('../modules/pool');
const TEAM = 'Team'; // Team Table

const teams = {
    createTeams: async(teaminfo) => {
        const info = "project,part,team_name,title,description,total";
        const insert = '?,?,?,?,?,?';
        const query = `insert into ${TEAM}(${info}) values (${insert})`;
    try {
        const result = await pool.queryParamArr(query,teaminfo);
        return result;
    } 
      catch (err) {
        console.log('createTeam ERROR: ', err);
        throw err;
        }
    }

}


module.exports = teams;