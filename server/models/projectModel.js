const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
const date = moment().format('YYYY-MM-DD HH:mm:ss');

const projectsSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true}, // 프로젝트 이름
    period: {type: String, required: true}, // or 마감기간
    description: {type: String, required: true}, // 프로젝트 내용 
    created_at: {type: String, default: date}, // 생성 시간
    scrap: {type: Number, default: 0}, // 스크랩 수
    img_url: {type: String}, // default 로 기본 사진 하나 추가해주기

    // 팀 목록을 배열로 선언하여 teamid를 기준으로 팀원을 추가합니다. post
    /*``` 사용 예시코드입니다. 서브쿼리로 따로 넣어주는 방법을 따로 찾아봐야합니다.
      projectSchema.methods.addUser = function (team) {
    this.teamlist.push({teamId: teams.name});
    return this.save();
    };
       ```*/
    teamlist: [new mongoose.Schema({teamId: String},{_id:false})], 
    projectsIdx: {type: Number, required: true} // 공모전, 프로젝트, 해커톤 등 구별 id 
});



projectsSchema.statics.showprojectsDetail = function (projectsIdx) {
    return this.find({"_id": mongoose.Types.ObjectId(projectsIdx)});
}

projectsSchema.statics.showteamsRecruitmentList = function (projectsIdx) {
    return this.find({"_id": mongoose.Types.ObjectId(projectsIdx)}); // 팀원 관련 스키마랑 합치기
}



module.exports = mongoose.model('projects', projectsSchema);
