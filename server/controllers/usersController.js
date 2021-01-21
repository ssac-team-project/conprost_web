const UsersModel = require('../models/usersModel');

const resMessage = require('../modules/resMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');

const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');

const users = {
    signIn: async (req, res) => {
        const {
            id,
            password
        } = req.body;
        // body에 필요한 값 누락 시
        if (!id || !password) {
            return es.status(statusCode.OK).send(util(statusCode.OK, resMessage.NULL_VALUE));
        }
        // user의 아이디가 있는지 확인
        const user = await UsersModel.checkUser(id);
        if (user[0] === undefined) {
            return res.status(statusCode.OK).send(util(statusCode.OK, resMessage.NO_USER));
        }
        // req의 password 확인
        const hashed_pw = await encrypt.encryptWithSalt(password, user[0].salt);
        if (hashed_pw !== user[0].password) {
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.MISS_MATCH_PW));
        }
        // 로그인 성공 (refreshToken은 말고 accessToken만 사용)
        const {token, _} = await jwt.sign(user[0]);

        return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {accessToken: token}));
    },
};

module.exports = users;