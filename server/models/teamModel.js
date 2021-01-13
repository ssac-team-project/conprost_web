var mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
var date = moment().format('YYYY-MM-DD HH:mm:ss');

const teamSchema = new mongoose.Schema({
    name: {type: String, required: true}, // 팀명
    title: {type: String, required: true}, // 팀원 모집글 title
    teammate: [{
        part: {type: String, required: true}, // 필요한 파트
        num_of_mates: {type: Number, required: true}
    }],
    total: {type: Number, required: true}, // 총 인원 수
    required: {type: Number, required: true}, // 필요한 인원 수
    created_at: {type: Date, default: date},
});

module.exports = mongoose.model('team', teamSchema);