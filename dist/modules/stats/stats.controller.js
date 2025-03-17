"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const stats_service_1 = require("./stats.service");
const common_2 = require("../../common");
let StatsController = class StatsController {
    constructor(statsService) {
        this.statsService = statsService;
    }
    async getDailyStats() {
        return this.statsService.getDailyMemberLeaderboard();
    }
    async getWeeklyStats() {
        return this.statsService.getWeeklyMemberLeaderboard();
    }
    async getBiWeeklyStats() {
        return this.statsService.getBiWeeklyMemberLeaderboard();
    }
    async getMetrics() {
        return this.statsService.getMetrics();
    }
    async getTotalActiveQuizzes() {
        return this.statsService.getTopPerformerMember();
    }
    async getMonthlyCompletion() {
        return this.statsService.getMonthlyCompletion();
    }
    async getWeeklyCompletion() {
        return this.statsService.getWeeklyCompletion();
    }
    async getPersonalStats(req) {
        const memberId = req.user?.sub;
        if (!memberId)
            throw new common_1.UnauthorizedException(common_2.EErrorMessage.INVALID_TOKEN_ERROR);
        return this.statsService.getPersonalStats(memberId);
    }
};
exports.StatsController = StatsController;
__decorate([
    (0, common_1.Get)('daily-leaderboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getDailyStats", null);
__decorate([
    (0, common_1.Get)('weekly-leaderboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getWeeklyStats", null);
__decorate([
    (0, common_1.Get)('bi-weekly-leaderboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getBiWeeklyStats", null);
__decorate([
    (0, common_1.Get)('metrics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getMetrics", null);
__decorate([
    (0, common_1.Get)('top-performer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getTotalActiveQuizzes", null);
__decorate([
    (0, common_1.Get)('monthly-completion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getMonthlyCompletion", null);
__decorate([
    (0, common_1.Get)('weekly-completion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getWeeklyCompletion", null);
__decorate([
    (0, common_1.Get)('personal'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getPersonalStats", null);
exports.StatsController = StatsController = __decorate([
    (0, common_1.Controller)('stats'),
    __metadata("design:paramtypes", [stats_service_1.StatsService])
], StatsController);
//# sourceMappingURL=stats.controller.js.map