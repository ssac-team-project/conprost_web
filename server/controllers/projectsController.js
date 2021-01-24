const ProjectsModel = require('../models/projectsModel');
const resMessage = require('../modules/resMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');

const projects = {
    showProjects : async (req, res) => {
        const categoryIdx = req.params.categoryIdx;
        try {
            const result = await ProjectsModel.showProjects(categoryIdx);
            console.log(result);
            if (!result) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.SHOW_PROJECTS_FAIL));
            } else if (result.length === 0) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NO_CONTENT));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SHOW_PROJECTS_SUCCESS, result));
            }
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },
    searchByKeyword: async (req, res) => {
        const keyword = req.params.keyword;
        try {
            const result = await ProjectsModel.searchByKeyword(keyword);
            if (!result) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.SEARCH_FAIL));
            } else if (result.length === 0) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.NO_CONTENT));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SEARCH_SUCCESS, result));
            }
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    },
    updateProjectPeriod: async (req, res) => {
        const projectIdx = req.params.projectIdx;
        const {period} = req.body;
        try {
            const result = await ProjectsModel.updateProjectPeriod(projectIdx, period);
            if (!result) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.UPDATE_PERIOD_FAIL));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.UPDATE_PERIOD_SUCCESS, result));
            }
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    }
}

module.exports = projects;