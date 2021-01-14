const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userid: {type: String, required: true, unique: true}, // 아이디
    password: {type: String, required: true}, // 비밀번호
    email: {type: String, required: true, trim:true}, // 프로젝트 내용 
    name: {type: String, required: true, unique: true }, // 닉네임
    scrap: {type: Number, default: 0}, // 스크랩 수
    self: {type: String }, // 자기소개
    img_url: {type: String}, // default 로 기본 사진 하나 추가해주기
    trust: {type: Number}, // 기여도
    token: {type: Number, required: true}, // 토큰
    tokenExp: {type: Number}, //토큰 만료값
    //teams: [new mongoose.Schema({teamId: String, teamName: String})] // 속한 팀
});

module.exports = mongoose.model('users', usersSchema);