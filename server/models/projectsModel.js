const pool = require('../modules/pool');

const PROJECT = 'Project'; // Project Table 

const projects = {
    // showProjects) 프로젝트 관련 정보 조회 - 프로젝트/스타트업 등은 바로 팀원 모집 글 조회
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
    },
    updateProjectPeriod: async (projectIdx, period) => {
        const query = `UPDATE ${PROJECT} SET period = '${period}' where project = ${projectIdx}`;
        const selectQuery = `SELECT * FROM ${PROJECT}`;
        try {
            await pool.queryParam(query);
            const result = await pool.queryParam(selectQuery);
            return result;
        } catch (err) {
            console.log('updateProjectPeriod ERROR: ', err);
            throw err;
        }
    }
}

module.exports = projects;