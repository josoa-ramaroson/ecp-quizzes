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
exports.AnswerHistoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("./schemas");
const common_2 = require("../../common");
const mongoose_2 = require("mongoose");
let AnswerHistoryService = class AnswerHistoryService {
    constructor(answerHistoryModel) {
        this.answerHistoryModel = answerHistoryModel;
    }
    async create(createAnswerHistoryDto) {
        const newAnswerHistory = new this.answerHistoryModel(createAnswerHistoryDto);
        return await newAnswerHistory.save();
    }
    async findAll() {
        return await this.answerHistoryModel.find();
    }
    async findOne(id) {
        const existingHistory = await this.answerHistoryModel.findById(id);
        if (!existingHistory)
            throw new common_1.NotFoundException(common_2.EErrorMessage.ANSWER_HISTORY_NOT_FOUND);
        return existingHistory;
    }
    async findByMember(memberId) {
        const foundAnswerHistory = this.answerHistoryModel.find({
            memberId,
        });
        return foundAnswerHistory;
    }
    async findQuizTakenByMember(quizId, memberId) {
        const foundAnswerHistory = await this.answerHistoryModel.findOne({
            memberId,
            quizId,
        });
        if (!foundAnswerHistory)
            throw new common_1.NotFoundException(common_2.EErrorMessage.ANSWER_HISTORY_NOT_FOUND);
        return foundAnswerHistory;
    }
    async findQuizTakenByMemberFromADate(memberId, date) {
        const foundAnswerHistories = await this.answerHistoryModel.find({
            memberId,
            finishedAt: { $gte: date },
        });
        if (!foundAnswerHistories)
            return [];
        return foundAnswerHistories;
    }
    async getNumberQuizInHistory(quizId) {
        return this.answerHistoryModel.countDocuments({ quizId });
    }
    async countQuizTakenByMember(memberId) {
        return this.answerHistoryModel.countDocuments({ memberId });
    }
    async countHistoryBetweenDate(startDate, deadline) {
        startDate.setUTCHours(0, 0, 0, 0);
        deadline.setUTCHours(23, 59, 59, 59);
        return this.answerHistoryModel.countDocuments({
            finishedAt: {
                $gte: startDate,
                $lte: deadline,
            },
        });
    }
    remove(id) {
        return `This action removes a #${id} answerHistory`;
    }
};
exports.AnswerHistoryService = AnswerHistoryService;
exports.AnswerHistoryService = AnswerHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.AnswerHistory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AnswerHistoryService);
//# sourceMappingURL=answer-history.service.js.map