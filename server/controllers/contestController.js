const ContestModel = require('../models/contestModel');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const resMessage = require('../modules/resMessage');

const contest = {
    register: async (req, res) => {
        const data = req.body;
        try {
            const result = await ContestModel.register(data);
            if (!result) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, '등록 실패'));
            }
            return res.status(statusCode.OK).send(util.success(statusCode.OK, '등록 성공', result));
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },
    showContestDetail: async (req, res) => {
        const contestIdx = req.params.contestIdx; // 입력
        try {
            const result = await ContestModel.showContestDetail(contestIdx); // 필요한 데이터를 활용
            console.log(result); 
            if (!result) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.CONTEST_DETAIL_FAIL)); // 출력
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CONTEST_DETAIL_SUCCESS, result)); // 출력
            }
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },
    showTeamRecruitmentList: async (req, res) => {
        const contestIdx = req.params.contestIdx;
        try {
            const result = await ContestModel.showTeamRecruitmentList(contestIdx);
            if (!result) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.TEAM_RECRUITMENT_FAIL));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.TEAM_RECRUITMENT_SUCCESS, result));
            }
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },
    updateTeamList: async (req, res) => {
        const contestIdx = req.params.contestIdx;
        const data = req.body;
        try {
            const result = await ContestModel.updateTeamList(data, contestIdx);
            if (!result) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.TEAM_RECRUITMENT_FAIL));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.TEAM_RECRUITMENT_SUCCESS, result));
            }
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    }
}

module.exports = contest;