"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastMondayFromWeek = getLastMondayFromWeek;
function getLastMondayFromWeek(week) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = (dayOfWeek + 6) % 7;
    today.setDate(today.getDate() - daysSinceMonday - 7 * week);
    return today;
}
//# sourceMappingURL=get-monday-date.util.js.map