const UsersModel = require('../models/usersModel');

const resMessage = require('../modules/resMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');

const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');

const users = {
    signUp: async (req, res) => {
        const {
            user_id, 
            password,
            user_name,
            email
        } = req.body;
        try {
            // 필요한 값 누락 시
            if (!user_id || !password || !user_name || !email) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
            }
            // 사용중인 아이디가 있는지 확인
            const ID = await UsersModel.checkUser(user_id);
            if (ID.length > 0) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.ALREADY_ID));
            }
            // 해싱
            const {hashed, salt} = await encrypt.encrypt(password);
            // 회원가입
            const userIdx = await UsersModel.signUp(user_id, hashed, salt, user_name, email);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SIGN_UP, {user: userIdx}));
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
        
    },
    signIn: async (req, res) => {
        const {
            user_id,
            password
        } = req.body;
        
        try {
            // body에 필요한 값 누락 시
            if (!user_id || !password) {
                return res.status(statusCode.OK).send(util(statusCode.OK, resMessage.NULL_VALUE));
            }
            // user의 아이디가 있는지 확인
            const user = await UsersModel.checkUser(user_id);
            if (user[0] === undefined) {
                return res.status(statusCode.OK).send(util(statusCode.OK, resMessage.NO_USER));
            }
            // req의 password 확인
            const hashed_pw = await encrypt.encryptWithSalt(password, user[0].salt);
            if (hashed_pw !== user[0].password) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.MISS_MATCH_PW));
            }
            // 로그인 성공 (refreshToken은 말고 accessToken만 사용)
            console.log(user[0]);
            const {token, _} = await jwt.sign(user[0]);

            return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {accessToken: token}));
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },
    showProfile: async (req, res) => {
        const userIdx = req.decoded.id;

        try {
            const result = await UsersModel.showProfile(userIdx);
            if (!result) {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_PROFILE_FAIL));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, result[0]));
            }
        } catch (err) {
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },
    showTeamName: async (req, res) => {
        const userIdx = req.decoded.id;
        try {
            const result = await UsersModel.showTeamName(userIdx);
            if (result === undefined) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NO_TEAM_NAME));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_TEAMNAME_SUCCESS, result[0]));
            }
        } catch (err) {
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },
    showIntro: async (req, res) => {
        const userIdx = req.decoded.id;
        try {
            const result = await UsersModel.showIntro(userIdx);
            if (!result) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.READ_INTRO_FAIL));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_INTRO_SUCCESS, result[0]));
            }
        } catch (err) {
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },
    updateProfileImg: async (req, res) => {
        const userIdx = req.decoded.id;
        if (req.file === undefined) {
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NULL_VALUE));
        }
        const profile_img = req.file.location;
        console.log('req.file: ', req.file);
        
        // image type check
        const type = req.file.mimetype.split('/')[1];

        if (type !== 'jpeg' && type !== 'jpg' && type !== 'png') {
            return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.UNSUPPORTED_TYPE));
        }

        try {
            const result = await UsersModel.updateProfileImg(userIdx, profile_img);
            if (!result) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.UPDATE_IMAGE_FAIL));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.UPDATE_IMAGE_SUCCESS, result[0]));
            }
        } catch (err) {
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    }
};

module.exports = users;