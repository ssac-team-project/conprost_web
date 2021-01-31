const pool = require('../modules/pool');

const users = {
    // user_id, hashed, salt, user_name, email, profile_img
    signUp: async (user_id, password, salt, user_name, email) => {
        const questions = '?, ?, ?, ?, ?';
        const values = [user_id, password, salt, user_name, email];
        const query = `INSERT INTO User(user_id, password, salt, user_name, email) VALUES(${questions})`;

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
        const query = `SELECT id, user_id, password, salt 
                        FROM User WHERE user_id = '${user_id}'`;
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
                        FROM User
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
        const query1 = `SELECT userId 
                        FROM TeamUser
                        WHERE userId = ${userIdx};`
        const query2 = `SELECT tu.userId, t.team_name
                        FROM TeamUser tu INNER JOIN Team t
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
    },
    showIntro: async (userIdx) => {
        const query = `SELECT id, introduction, contribution, part_name
                        FROM User
                        WHERE id = ${userIdx}`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('showIntro ERROR: ', err);
            throw err;
        }
    },
    updateProfileImg: async (userIdx, profile_img) => {
        const query1 = `UPDATE User SET profile_img = '${profile_img}'
                        WHERE id = ${userIdx}`;

        // 아니면 그냥 넘겨주기?? (next())
        const query2 = `SELECT id, profile_img FROM User
                        WHERE id = ${userIdx}`;
        try {
            await pool.queryParam(query1);
            result = await pool.queryParam(query2);
            return result;
        } catch (err) {
            console.log('showIntro ERROR: ', err);
            throw err;
        }
    }
};

module.exports = users;