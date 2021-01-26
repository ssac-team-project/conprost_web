const pool = require('../modules/pool');

const USER = 'User';

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
        const query = `SELECT user_id, password, salt FROM ${USER} WHERE user_id = '${user_id}'`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('checkUser ERROR: ', err);
            throw err;
        }
    }
};

module.exports = users;