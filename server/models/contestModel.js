const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
var date = moment().format('YYYY-MM-DD HH:mm:ss');

const teamsSchema = new mongoose.Schema({ //SubDocument로 사용합니다. 
    users: {type: mongoose.SchemaTypes.ObjectId, ref:"users"},
    name: {type: String, required: true, unique: true}, // 팀명
    title: {type: String, required: true}, // 팀원 모집글 title 
    part: {type: String, required: true}, // 필요한 파트
    total: {type: Number, required: true}, // 필요한 총 인원
    mates: {type: Number, required: true}, // 현재 인원 수 

    // 팀원 목록을 배열로 선언하여 userid를 기준으로 팀원을 추가합니다. post
    /*``` 사용 예시코드입니다. 서브쿼리로 따로 넣어주는 방법을 따로 찾아봐야합니다.
      teamsSchema.methods.addUser = function (user) {
    this.userList.push({hostId: user.id});
    return this.save();
    };
       ```*/
    hostlist: [new mongoose.Schema({hostId: String},{_id:false})] 
});


const projectsSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true}, // 프로젝트 이름
    period: {type: String, required: true}, // or 마감기간
    description: {type: String, required: true}, // 프로젝트 내용 
    created_at: {type: String, default: date}, // 생성 시간
    scrap: {type: Number, default: 0}, // 스크랩 수
    img_url: {type: String}, // default 로 기본 사진 하나 추가해주기
    teams: [teamsSchema], // SubDocument
    projectsIdx: {type: Number, required: true} // 공모전, 프로젝트, 해커톤 등 구별 id 
});



projectsSchema.statics.showprojectsDetail = function (projectsIdx) {
    return this.find({"_id": mongoose.Types.ObjectId(projectsIdx)});
}

projectsSchema.statics.showteamsRecruitmentList = function (projectsIdx) {
    return this.find({"_id": mongoose.Types.ObjectId(projectsIdx)}); // 팀원 관련 스키마랑 합치기
}



module.exports = mongoose.model('projects', projectsSchema);
module.exports = mongoose.model('teams', teamsSchemaSchema);