const ContestModel = require('../models/contestModel');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');
const resMessage = require('../modules/resMessage');

const contest = {
    showContestDetail: async (req, res) => {
        const contestIdx = req.params.contestIdx;

        try {
            const result = await ContestModel.showContestDetail(contestIdx);
            if (!result) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.CONTEST_DETAIL_FAIL));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CONTEST_DETAIL_SUCCESS, result));
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
    }
}

module.exports = contest;