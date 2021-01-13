const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }, //팀 이름
    skills:{ type: String, required: true }, // 분야
    people:{ type: Number, required: true } // 총 인원 수 
});

teamSchema.statics.createTeam = function ({ title, skills, people }) {
    const team = new this({
        title, //팀 이름 
        skills, // 구하는 분야
        people // 총 인원 수 
    });

    return team.save();
};

// 보류 상의후 다시
teamSchema.static.applyTeam = function ({ title, skills }) {
    const apply = new this({
        title, // 만들어진 팀 이름
        skills // 원하는 분야
    });
    return apply.save()
}

module.exports = mongoose.model('team', teamSchema);