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
exports.AnswerHistorySchema = exports.AnswerHistory = exports.AnswersRecord = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const members_1 = require("../../members");
const questions_1 = require("../../questions");
const quizzes_1 = require("../../quizzes");
let AnswersRecord = class AnswersRecord {
};
exports.AnswersRecord = AnswersRecord;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: questions_1.Question.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AnswersRecord.prototype, "questionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], AnswersRecord.prototype, "answersIds", void 0);
exports.AnswersRecord = AnswersRecord = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], AnswersRecord);
let AnswerHistory = class AnswerHistory {
};
exports.AnswerHistory = AnswerHistory;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: quizzes_1.Quiz.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AnswerHistory.prototype, "quizId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: members_1.Member.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AnswerHistory.prototype, "memberId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [AnswersRecord], required: true }),
    __metadata("design:type", Array)
], AnswerHistory.prototype, "answersRecord", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    __metadata("design:type", Date)
], AnswerHistory.prototype, "finishedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, default: 0 }),
    __metadata("design:type", Number)
], AnswerHistory.prototype, "score", void 0);
exports.AnswerHistory = AnswerHistory = __decorate([
    (0, mongoose_1.Schema)()
], AnswerHistory);
exports.AnswerHistorySchema = mongoose_1.SchemaFactory.createForClass(AnswerHistory);
//# sourceMappingURL=answer-history.schema.js.map