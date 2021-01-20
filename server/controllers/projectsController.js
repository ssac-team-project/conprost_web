const ProjectsModel = require('../models/projectsModel');
// const pool = require('../modules/pool');

const resMessage = require('../modules/resMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');

const projects = {
    showProjects : async (req, res) => {
        try {
            const result = await ProjectsModel.showProjects();
            console.log(result);
            if (!result) {
                return res.status(statusCode.OK).send(util.fail(statusCode.OK, resMessage.SHOW_PROJECTS_FAIL));
            } else {
                return res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.SHOW_PROJECTS_SUCCESS, result));
            }
        } catch (err) {
            console.log(err);
            return res.status(statusCode.DB_ERROR).send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
        }
    }
}

module.exports = projects;