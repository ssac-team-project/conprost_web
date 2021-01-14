const mongoose = require('mongoose');

const teamsSchema = new mongoose.Schema({
    users: {type: mongoose.SchemaTypes.ObjectId, ref:"users"}, //user가 해당 team을 가지고 있게됨
    name: {type: String, required: true, unique: true}, // 팀명
    title: {type: String, required: true}, // 팀원 모집글 title 
    part: {type: String, required: true}, // 필요한 파트
    total: {type: Number, required: true}, // 필요한 총 인원
    mates: {type: Number, required: true}, // 현재 인원 수 
    userlist: [new mongoose.Schema({userId: String},{_id:false})] //팀원 목록
});


// 보류 상의후 다시 = 팀 스키마에 있지말고 유저 스키마로 가는게 맞는거같음
teamSchema.static.applyTeam = function ({ title, skills }) {
    const apply = new this({
        title, // 만들어진 팀 이름
        skills // 원하는 분야
    });
    return apply.save()
}

module.exports = mongoose.model('teams', teamsSchema);