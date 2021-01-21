const pool = require('../modules/pool');

const USER = 'User';

const users = {
    checkUser: async (id) => {
        const query = `SELECT id FROM ${USER} WHERE id = '${id}'`;
        try {
            const result = pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('checkUser ERROR: ', err);
            throw err;
        }
    }
};

module.exports = users;