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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const members_1 = require("../members");
const quizzes_service_1 = require("../quizzes/quizzes.service");
const answer_history_1 = require("../answer-history");
const utils_1 = require("../../utils");
const set_to_date_x_day_1 = require("../../utils/set-to-date-x-day");
const common_2 = require("../../common");
let StatsService = class StatsService {
    constructor(membersService, quizzesService, answerHistoryService) {
        this.membersService = membersService;
        this.quizzesService = quizzesService;
        this.answerHistoryService = answerHistoryService;
    }
    async getPersonalStats(memberId) {
        const quizzesTaken = await this.answerHistoryService.countQuizTakenByMember(memberId);
        const averageScore = await this.getAverageScoreOfMember(memberId);
        const questionAnswered = await this.getTotalQuestionsAnswered(memberId);
        const perfectScore = await this.getPerfectScoreCount(memberId);
        return {
            quizzesTaken,
            averageScore,
            questionAnswered,
            perfectScore,
        };
    }
    async getDailyMemberLeaderboard() {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        const stats = await this.getLeaderboardFromDate(today, common_2.EMemberRole.MEMBER);
        return stats;
    }
    async getWeeklyMemberLeaderboard() {
        const lastLastMonday = (0, utils_1.getLastMondayFromWeek)(0);
        const stats = await this.getLeaderboardFromDate(lastLastMonday, common_2.EMemberRole.MEMBER);
        return stats;
    }
    async getBiWeeklyMemberLeaderboard() {
        const lastLastMonday = (0, utils_1.getLastMondayFromWeek)(1);
        const stats = await this.getLeaderboardFromDate(lastLastMonday, common_2.EMemberRole.MEMBER);
        return stats;
    }
    async getTopPerformerMember() {
        const statQuiz = new Date('2025-03-10');
        return (await this.getLeaderboardFromDate(statQuiz, common_2.EMemberRole.MEMBER)).slice(0, 3);
    }
    async getLeaderboardFromDate(date, role) {
        const members = await this.membersService.findAllMember(role);
        const membersWithScore = await Promise.all(members.map(async (member) => {
            try {
                const quizzesDoneFromADate = await this.answerHistoryService.findQuizTakenByMemberFromADate(member._id.toString(), date);
                const totalScore = quizzesDoneFromADate.reduce((acc, quiz) => acc + quiz.score, 0);
                return {
                    memberId: member._id.toString(),
                    pseudo: member.pseudo,
                    score: totalScore,
                };
            }
            catch (error) {
                console.error(error);
                return {
                    memberId: member._id.toString(),
                    pseudo: member.pseudo,
                    score: 0,
                };
            }
        }));
        const sortedMember = membersWithScore.sort((a, b) => b.score - a.score);
        const memberWithRank = sortedMember.map((member, index) => ({
            ...member,
            rank: index + 1,
        }));
        return memberWithRank;
    }
    async getMetrics() {
        const activeQuizzes = await this.quizzesService.getActiveQuizzesCount();
        const totalMember = await this.membersService.getTotalCount();
        const completionRate = await this.getGlobalCompletionRate();
        return {
            totalMember,
            activeQuizzes,
            completionRate,
        };
    }
    async getQuizCompletionRate(quizId) {
        const totalMember = await this.membersService.getTotalCount();
        const numberInHistory = await this.answerHistoryService.getNumberQuizInHistory(quizId);
        return (numberInHistory / totalMember) * 100;
    }
    async getGlobalCompletionRate() {
        const quizzes = await this.quizzesService.findAll();
        const completionRates = await Promise.all(quizzes.map(async (quiz) => await this.getQuizCompletionRate(quiz._id.toString())));
        const completionRate = quizzes.length > 0
            ? Math.round((completionRates.reduce((sum, rate) => sum + rate, 0) /
                quizzes.length) *
                10000) / 10000
            : 0;
        return completionRate;
    }
    async getWeeklyCompletion() {
        const days = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ];
        const today = new Date();
        const completionsArray = await Promise.all(days.map(async (dayName, i) => {
            const day = (0, set_to_date_x_day_1.setToXDay)(today, i);
            const startOfDay = new Date(day);
            const endOfDay = new Date(day);
            const completions = await this.answerHistoryService.countHistoryBetweenDate(startOfDay, endOfDay);
            return {
                name: dayName,
                completions,
            };
        }));
        return completionsArray;
    }
    async getMonthlyCompletion() {
        const completionsArray = [];
        const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        for (let i = 1; i < 5; i++) {
            const startMonday = (0, utils_1.getLastMondayFromWeek)(i);
            const deadlineMonday = (0, utils_1.getLastMondayFromWeek)(i - 1);
            const completions = await this.answerHistoryService.countHistoryBetweenDate(startMonday, deadlineMonday);
            completionsArray.push({
                name: weeks[i - 1],
                completions,
            });
        }
        return completionsArray;
    }
    async getAverageScoreOfMember(memberId) {
        try {
            const answerHistory = await this.answerHistoryService.findByMember(memberId.toString());
            if (answerHistory.length === 0) {
                return 0;
            }
            const scorePercentages = await Promise.all(answerHistory.map(async (history) => {
                try {
                    const maxPossibleScore = await this.quizzesService.getQuizzesMaxScore(history.quizId.toString());
                    return maxPossibleScore > 0 ? history.score / maxPossibleScore : 0;
                }
                catch (error) {
                    console.error(`Error calculating score for quiz ${history.quizId.toString()}: ${error.message}`);
                    return 0;
                }
            }));
            const averageScore = scorePercentages.length > 0
                ? scorePercentages.reduce((sum, percentage) => sum + percentage, 0) /
                    scorePercentages.length
                : 0;
            return Math.round(averageScore * 10000) / 100;
        }
        catch (error) {
            console.error(`Error calculating average score for member ${memberId.toString()}: ${error.message}`);
            return 0;
        }
    }
    async getPerfectScoreCount(memberId) {
        try {
            const answerHistory = await this.answerHistoryService.findByMember(memberId.toString());
            if (answerHistory.length === 0) {
                return 0;
            }
            const perfectScores = await Promise.all(answerHistory.map(async (history) => {
                try {
                    const maxPossibleScore = await this.quizzesService.getQuizzesMaxScore(history.quizId.toString());
                    return history.score === maxPossibleScore ? 1 : 0;
                }
                catch (error) {
                    console.error(`Error checking perfect score for quiz ${history.quizId.toString()}: ${error.message}`);
                    return 0;
                }
            }));
            return perfectScores.reduce((sum, isPerfect) => sum + isPerfect, 0);
        }
        catch (error) {
            console.error(`Error calculating perfect scores for member ${memberId.toString()}: ${error.message}`);
            return 0;
        }
    }
    async getTotalQuestionsAnswered(memberId) {
        try {
            const answerHistory = await this.answerHistoryService.findByMember(memberId.toString());
            if (answerHistory.length === 0) {
                return 0;
            }
            const questionsAnswered = answerHistory.map((history) => {
                try {
                    return history.answersRecord?.length || 0;
                }
                catch (error) {
                    console.error(`Error counting questions for quiz ${history.quizId.toString()}: ${error.message}`);
                    return 0;
                }
            });
            return questionsAnswered.reduce((sum, count) => sum + count, 0);
        }
        catch (error) {
            console.error(`Error calculating total questions for member ${memberId.toString()}: ${error.message}`);
            return 0;
        }
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [members_1.MembersService,
        quizzes_service_1.QuizzesService,
        answer_history_1.AnswerHistoryService])
], StatsService);
//# sourceMappingURL=stats.service.js.map