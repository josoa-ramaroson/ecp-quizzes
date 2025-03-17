"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../../common");
let QuestionValidationPipe = class QuestionValidationPipe {
    transform(value) {
        const answersOptions = value.answersOptions;
        if (answersOptions == undefined ||
            !Array.isArray(answersOptions) ||
            answersOptions.length === 0)
            throw new common_1.BadRequestException(common_2.EErrorMessage.INVALID_ANSWER_OPTIONS);
        const isCorrectAnswers = answersOptions?.filter((a) => a.isCorrect);
        if (isCorrectAnswers?.length === 0)
            throw new common_1.BadRequestException(common_2.EErrorMessage.NO_CORRECT_ANSWER);
        return value;
    }
};
exports.QuestionValidationPipe = QuestionValidationPipe;
exports.QuestionValidationPipe = QuestionValidationPipe = __decorate([
    (0, common_1.Injectable)()
], QuestionValidationPipe);
//# sourceMappingURL=question-validation.pipe.js.map