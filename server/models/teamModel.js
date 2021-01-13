const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }, //팀 이름
    skills:{ type: String, required: true }, // 분야
    people:{ type: Number, required: true }, // 총 인원 수
    description: {type: String, required: true}, // 모집글
    admin: {type: String, default: true}, // 생성자
    current:{type: Number, default: 0} // 현재 인원 
});

teamSchema.statics.createTeam = function ({ title, skills, peoples,description }) {
    const team = new this({
        title, //팀 이름 
        skills, // 구하는 분야
        peoples, // 총 인원 수 
        description // 홍보 글
    });

    return team.save();
};

// 보류 상의후 다시 = 팀 스키마에 있지말고 유저 스키마로 가는게 맞는거같음
teamSchema.static.applyTeam = function ({ title, skills }) {
    const apply = new this({
        title, // 만들어진 팀 이름
        skills // 원하는 분야
    });
    return apply.save()
}

module.exports = mongoose.model('team', teamSchema);