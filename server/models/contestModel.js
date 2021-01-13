const mongoose = require('mongoose');
const moment = require('moment');
const contest = require('../controllers/contestController');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
var date = moment().format('YYYY-MM-DD HH:mm:ss');

const contestSchema = new mongoose.Schema({
    title: {type: String, required: true},
    host: {type: String, required: true},
    period: {type: String, required: true}, // or 마감기간
    description: {type: String, required: true},
    created_at: {type: String, default: date},
    scrap: {type: Number, default: 0},
    img_url: {type: String} // default 로 기본 사진 하나 추가해주기
});

contestSchema.statics.showContestDetail = function (contestIdx) {
    return this.find({"_id": mongoose.Types.ObjectId(contestIdx)});
}

contestSchema.statics.showTeamRecruitmentList = function (contestIdx) {
    return this.find({"_id": mongoose.Types.ObjectId(contestIdx)}); // 팀원 관련 스키마랑 합치기
}

module.exports = mongoose.model('contest', contestSchema);