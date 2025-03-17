"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToXDay = setToXDay;
function setToXDay(date, dayIndex) {
    const result = new Date(date);
    const currentDay = result.getUTCDay() === 0 ? 6 : result.getUTCDay() - 1;
    result.setUTCDate(result.getUTCDate() - currentDay);
    result.setUTCDate(result.getUTCDate() + dayIndex);
    result.setUTCHours(0, 0, 0, 0);
    return result;
}
//# sourceMappingURL=set-to-date-x-day.js.map