const pool = require('../modules/pool');

const PROJECT = 'Project'; // Project Table 

const projects = {
    showProjects: async (categoryIdx) => {
        const query = `SELECT * FROM ${PROJECT} WHERE categoryIdx = ${categoryIdx} ORDER BY scrap desc`; // 스크랩순
        try {
            const result = await pool.queryParam(query);
            console.log(result);
            return result;
        } catch (err) {
            console.log('showProjects ERROR: ', err);
            throw err;
        }
    },
    searchByKeyword: async (keyword) => {
        // 프로젝트 테이블 내 프로젝트 이름, 설명만 검색
        const query = `SELECT * FROM ${PROJECT} p 
                        WHERE (binary p.project_name like "%${keyword}%"
                        or binary p.description like "%${keyword}%")
                        ORDER BY p.scrap desc`;
        try {
            const result = await pool.queryParam(query);
            return result;
        } catch (err) {
            console.log('searchByKeyword ERROR: ', err);
            throw err;
        }
    }
}

module.exports = projects;