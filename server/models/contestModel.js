const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
var date = moment().format('YYYY-MM-DD HH:mm:ss');

const contestSchema = new mongoose.Schema({
    contest_title: {type: String, required: true},
    host: {type: String, required: true},
    period: {type: String, required: true}, // or 마감기간
    description: {type: String, required: true},
    created_at: {type: String, default: date},
    scrap: {type: Number, default: 0},
    img_url: {type: String}, // default 로 기본 사진 하나 추가해주기
    team_list: [{
        teamIdx: {type: mongoose.Types.ObjectId, ref: "team", required: true},
        team_title: {type: String, required: true}, // 팀원 모집글 title
        teammate: [{
            part: {type: String, required: true}, // 필요한 파트
            num_of_mates: {type: Number, required: true}
        }],
        total: {type: Number, required: true}, // 총 인원 수
        required: {type: Number, required: true}, // 필요한 인원 수
    }]
});

contestSchema.statics.register = function(payload) {
    const contest = new this(payload);
    return contest.save();
}

contestSchema.statics.showContestDetail = function (contestIdx) {
    return this.find({'_id': contestIdx})
                .select("contest_title host period description img_url");
}

contestSchema.statics.showTeamRecruitmentList = function (contestIdx) {
    return this.find({"_id": mongoose.Types.ObjectId(contestIdx)}) // 팀원 관련 스키마랑 합치기
                .select("team");
}

module.exports = mongoose.model('contest', contestSchema);