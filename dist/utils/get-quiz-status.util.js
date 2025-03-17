"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuizStatus = getQuizStatus;
const common_1 = require("../common");
function getQuizStatus(quiz) {
    const nowDate = new Date();
    nowDate.setUTCHours(0, 0, 0, 0);
    const startDate = quiz.startDate;
    const deadline = quiz.deadline;
    if (nowDate > deadline)
        return common_1.EQuizSTatus.CLOSED;
    else if (startDate > nowDate)
        return common_1.EQuizSTatus.UPCOMING;
    else
        return common_1.EQuizSTatus.OPEN;
}
//# sourceMappingURL=get-quiz-status.util.js.map