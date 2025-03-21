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
exports.VerifyManyQuestionIdPipe = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../../common");
const questions_1 = require("../../questions");
const utils_1 = require("../../../utils");
let VerifyManyQuestionIdPipe = class VerifyManyQuestionIdPipe {
    constructor(questionsSerivice) {
        this.questionsSerivice = questionsSerivice;
    }
    async transform(value) {
        if (!value?.questionsIds)
            throw new common_1.BadRequestException(common_2.EErrorMessage.MISSING_QUESTION_IDS_ERROR);
        const questionsIds = value?.questionsIds;
        if (!Array.isArray(questionsIds))
            throw new common_1.BadRequestException(common_2.EErrorMessage.QUESTION_IDS_IN_BAD_FORMAT);
        if (questionsIds.some((id) => typeof id !== 'string' && (0, utils_1.verifyObjectId)(id)))
            throw new common_1.BadRequestException(common_2.EErrorMessage.INVALID_QUESTION_IDS_ERROR);
        const existingQuestions = await this.questionsSerivice.findManyWithOutAnswer(questionsIds);
        if (existingQuestions.length !== questionsIds.length) {
            const existingIds = new Set(existingQuestions.map((q) => q.id));
            const missingIds = questionsIds.filter((id) => !existingIds.has(id));
            throw new common_1.NotFoundException(`${common_2.EErrorMessage.QUESTION_NOT_FOUND}: ${missingIds.join(', ')}`);
        }
        return { questionsIds };
    }
};
exports.VerifyManyQuestionIdPipe = VerifyManyQuestionIdPipe;
exports.VerifyManyQuestionIdPipe = VerifyManyQuestionIdPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [questions_1.QuestionsService])
], VerifyManyQuestionIdPipe);
//# sourceMappingURL=verify-many-question-id.pipe.js.map