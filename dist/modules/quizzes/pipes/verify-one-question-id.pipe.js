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
exports.VerifyOneQuestionIdPipe = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../../common");
const utils_1 = require("../../../utils");
const questions_1 = require("../../questions");
let VerifyOneQuestionIdPipe = class VerifyOneQuestionIdPipe {
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    async transform(value) {
        if (!value?.questionId)
            throw new common_1.BadRequestException(common_2.EErrorMessage.MISSING_QUESTION_ID_ERROR);
        if (typeof value?.questionId !== 'string')
            throw new common_1.BadRequestException(common_2.EErrorMessage.INVALID_QUESTION_ID_ERROR);
        const questionId = value.questionId;
        if (!(0, utils_1.verifyObjectId)(questionId))
            throw new common_1.BadRequestException(common_2.EErrorMessage.INVALID_QUESTION_ID_ERROR);
        const existingQuestion = await this.questionsService.findOne(questionId);
        if (!existingQuestion)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUESTION_NOT_FOUND);
        return { questionId };
    }
};
exports.VerifyOneQuestionIdPipe = VerifyOneQuestionIdPipe;
exports.VerifyOneQuestionIdPipe = VerifyOneQuestionIdPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [questions_1.QuestionsService])
], VerifyOneQuestionIdPipe);
//# sourceMappingURL=verify-one-question-id.pipe.js.map