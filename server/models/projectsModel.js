const pool = require('../modules/pool');

const PROJECT = 'Project'; // Project Table 

const projects = {
    showProjects: async () => {
        const query = `SELECT * FROM ${PROJECT} ORDER BY scrap`; // 스크랩순
        try {
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            console.log('showProjects ERROR: ', err);
            throw err;
        }
    },
    
}

module.exports = projects;