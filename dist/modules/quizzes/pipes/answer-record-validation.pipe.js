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
exports.AnswerRecordValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const questions_1 = require("../../questions");
const common_2 = require("../../../common");
let AnswerRecordValidationPipe = class AnswerRecordValidationPipe {
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    async transform(value) {
        const answersRecord = value.answers;
        const questionIds = answersRecord.map((answer) => answer.questionId);
        await this.verifyQuestionsId(questionIds);
        return value;
    }
    async verifyQuestionsId(questionsIds) {
        const questions = await this.questionsService.findManyWithOutAnswer(questionsIds);
        const foundQuestionIds = new Set(questions.map((q) => q._id.toString()));
        const missingQuestions = questionsIds.filter((id) => !foundQuestionIds.has(id));
        if (missingQuestions.length > 0) {
            throw new common_1.BadRequestException({
                message: common_2.EErrorMessage.QUESTION_NOT_FOUND,
                missingQuestions,
            });
        }
    }
};
exports.AnswerRecordValidationPipe = AnswerRecordValidationPipe;
exports.AnswerRecordValidationPipe = AnswerRecordValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [questions_1.QuestionsService])
], AnswerRecordValidationPipe);
//# sourceMappingURL=answer-record-validation.pipe.js.map