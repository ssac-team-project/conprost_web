const pool = require('../modules/pool');

const USER = 'User';
const TEAM = 'Team';
const TEAM_USER = 'TeamUser';

const users = {
    // user_id, hashed, salt, user_name, email, profile_img
    signUp: async (user_id, password, salt, user_name, email) => {
        const fields = 'user_id, password, salt, user_name, email';
        const questions = '?, ?, ?, ?, ?';
        const values = [user_id, password, salt, user_name, email];
        const query = `INSERT INTO ${USER}(${fields}) VALUES(${questions})`;

        try {
            const result = await pool.queryParamArr(query, values);
            const insertId = result.insertId;
            return insertId;
        } catch (err) {
            console.log('signUp ERROR: ', err);
            throw err;
        }
    },
    checkUser: async (user_id) => {
        const query = `SELECT id, user_id, password, salt FROM ${USER} WHERE user_id = '${user_id}'`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('checkUser ERROR: ', err);
            throw err;
        }
    },
    showProfile: async (userIdx) => {
        // 팀원 신청되면 팀명도 같이
        const query = `SELECT id, user_id, user_name, email, profile_img
                        FROM ${USER}
                        WHERE id = ${userIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('showProfile ERROR: ', err);
            throw err;
        }
    },
    showTeamName: async (userIdx) => {
        const query1 = `SELECT u.id, tu.userId 
                        FROM ${USER} u INNER JOIN ${TEAM_USER} tu 
                        ON u.id = tu.userId 
                        WHERE u.id = ${userIdx};`
        const query2 = `SELECT tu.userId, t.team_name
                        FROM ${TEAM_USER} tu INNER JOIN ${TEAM} t
                        ON tu.teamId = t.id
                        WHERE tu.userId = ${userIdx}`;
        try {
            let result = await pool.queryParam(query1);
            console.log(result);
            if (result.length === 0) {
                return;
            } else {
                result = await pool.queryParam(query2);
                return result;
            }
            return result;
        } catch (err) {
            console.log('showTeamName ERROR: ', err);
            throw err;
        }
    }
};

module.exports = users;