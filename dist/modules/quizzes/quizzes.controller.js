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
exports.QuizzesController = void 0;
const common_1 = require("@nestjs/common");
const quizzes_service_1 = require("./quizzes.service");
const dto_1 = require("./dto");
const pipes_1 = require("./pipes");
const interceptors_1 = require("./interceptors");
const common_2 = require("../../common");
const guards_1 = require("./guards");
let QuizzesController = class QuizzesController {
    constructor(quizzesService) {
        this.quizzesService = quizzesService;
    }
    async findAll() {
        return await this.quizzesService.findAll();
    }
    async findDaily(req) {
        const memberId = req.user?.sub;
        if (!memberId)
            throw new common_1.UnauthorizedException(common_2.EErrorMessage.INVALID_TOKEN_ERROR);
        return await this.quizzesService.findDaily(memberId);
    }
    async findByDate(date) {
        return await this.quizzesService.findAllByDate(date);
    }
    async findBefore(date) {
        return await this.quizzesService.findAllBefore(date);
    }
    async findByNow(req) {
        const memberId = req.user?.sub;
        if (!memberId)
            throw new common_1.UnauthorizedException(common_2.EErrorMessage.INVALID_TOKEN_ERROR);
        return await this.quizzesService.findOfMember(memberId);
    }
    async findUpComing() {
        return await this.quizzesService.findUpComing();
    }
    async findOne(id, req) {
        const memberId = req.user?.sub;
        if (!memberId)
            throw new common_1.UnauthorizedException(common_2.EErrorMessage.INVALID_TOKEN_ERROR);
        return await this.quizzesService.findQuestionsOfQuiz(id, memberId);
    }
    async createOne(createQuizDto) {
        return await this.quizzesService.createOne(createQuizDto);
    }
    async evaluate(id, evaluateQuizResponseDto, req) {
        const memberId = req.user?.sub;
        if (!memberId)
            throw new common_1.UnauthorizedException(common_2.EErrorMessage.INVALID_TOKEN_ERROR);
        return await this.quizzesService.evaluate(id, evaluateQuizResponseDto, memberId);
    }
    async updateOne(id, updateQuizDto) {
        return await this.quizzesService.updateOne(id, updateQuizDto);
    }
    async deleteQuestionsFromQuiz(questionId) {
        return await this.quizzesService.removeQuestionIdFromQuizzes(questionId);
    }
    async deleteOne(id) {
        return await this.quizzesService.deleteOne(id);
    }
};
exports.QuizzesController = QuizzesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('daily'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "findDaily", null);
__decorate([
    (0, common_1.Get)('by-date/:date'),
    __param(0, (0, common_1.Param)('date', pipes_1.ParseDatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "findByDate", null);
__decorate([
    (0, common_1.Get)('before/:date'),
    __param(0, (0, common_1.Param)('date', pipes_1.ParseDatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "findBefore", null);
__decorate([
    (0, common_1.Get)('of-member'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "findByNow", null);
__decorate([
    (0, common_1.Get)('upcoming'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "findUpComing", null);
__decorate([
    (0, common_1.Get)(':id/questions'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateQuizDto]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "createOne", null);
__decorate([
    (0, common_1.Post)(':id/evaluate'),
    (0, common_1.UseInterceptors)(interceptors_1.ScoringInterceptor, interceptors_1.AnswerHistoryInterceptor),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(pipes_1.AnswerRecordValidationPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.EvaluateQuizDto, Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "evaluate", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateQuizDto]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Delete)('question/:questionId'),
    __param(0, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "deleteQuestionsFromQuiz", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "deleteOne", null);
exports.QuizzesController = QuizzesController = __decorate([
    (0, common_1.Controller)('quizzes'),
    (0, common_1.UseGuards)(guards_1.ActiveAccountGuard),
    __metadata("design:paramtypes", [quizzes_service_1.QuizzesService])
], QuizzesController);
//# sourceMappingURL=quizzes.controller.js.map