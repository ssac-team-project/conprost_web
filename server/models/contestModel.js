const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
var date = moment().format('YYYY-MM-DD HH:mm:ss');

const teamSchema = new mongoose.Schema({ //SubDocument로 사용합니다. 
    name: {type: String, required: true, unique: true}, // 팀명
    title: {type: String, required: true}, // 팀원 모집글 title 
    part: {type: String, required: true}, // 필요한 파트
    total: {type: Number, required: true}, // 필요한 총 인원
    mates: {type: Number, required: true}, // 현재 인원 수 
});


const projectSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true}, // 프로젝트 이름
    period: {type: String, required: true}, // or 마감기간
    description: {type: String, required: true}, // 프로젝트 내용 
    created_at: {type: String, default: date}, // 생성 시간
    scrap: {type: Number, default: 0}, // 스크랩 수
    img_url: {type: String}, // default 로 기본 사진 하나 추가해주기
    teams: [teamSchema], // SubDocument
    projectIdx: {type: Number, required: true} // 공모전, 프로젝트, 해커톤 등 구별 id 
});



projectSchema.statics.showprojectDetail = function (projectIdx) {
    return this.find({"_id": mongoose.Types.ObjectId(projectIdx)});
}

projectSchema.statics.showTeamRecruitmentList = function (projectIdx) {
    return this.find({"_id": mongoose.Types.ObjectId(projectIdx)}); // 팀원 관련 스키마랑 합치기
}



module.exports = mongoose.model('project', projectSchema);