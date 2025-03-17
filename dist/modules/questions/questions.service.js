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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const common_2 = require("../../common");
const mongoose_2 = require("mongoose");
const schemas_1 = require("./schemas");
const utils_1 = require("../../utils");
let QuestionsService = class QuestionsService {
    constructor(questionModel) {
        this.questionModel = questionModel;
    }
    async createOne(createQuestionDto) {
        const newQuestion = new this.questionModel({
            ...createQuestionDto,
            creationDate: new Date(),
        });
        return await newQuestion.save();
    }
    async findAll() {
        const existingQuestions = await this.questionModel.find();
        return existingQuestions;
    }
    async findOne(id) {
        const existingQuestion = await this.questionModel.findById(id);
        if (!existingQuestion)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUESTION_NOT_FOUND);
        return existingQuestion;
    }
    async findManyWithAnswer(questionsIds) {
        const existingQuestion = await this.questionModel.find({
            _id: { $in: questionsIds },
        });
        if (!existingQuestion)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUESTIONS_NOT_FOUND);
        return existingQuestion;
    }
    async findManyWithOutAnswer(questionsIds) {
        const existingQuestion = await this.questionModel.find({
            _id: { $in: questionsIds },
        });
        if (!existingQuestion)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUESTIONS_NOT_FOUND);
        const answerFilteredQuestions = existingQuestion.map((question) => this.removeIsCorrectFromAnswers(question));
        return answerFilteredQuestions;
    }
    async updateOne(id, updateQuestionDto) {
        const updatedQuestion = await this.questionModel.findByIdAndUpdate(id, updateQuestionDto, {
            new: true,
        });
        if (!updatedQuestion)
            throw new common_1.NotFoundException(common_2.EErrorMessage.UPDATED_QUESTION_NOT_FOUND);
        return updatedQuestion;
    }
    async deleteOne(id) {
        const deletedQuestion = await this.questionModel.findByIdAndDelete(id);
        if (!deletedQuestion)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUESTION_NOT_FOUND);
        return deletedQuestion;
    }
    async checkAnswers(id, providedAnswersIds) {
        const existingQuestion = await this.questionModel.findById(id);
        if (!existingQuestion)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUESTION_NOT_FOUND);
        const answersOptions = existingQuestion.answersOptions;
        const correctAnswersIds = answersOptions
            .filter((a) => a.isCorrect)
            .map((a) => a.id);
        let score = 0;
        if ((0, utils_1.isSubArray)(correctAnswersIds, providedAnswersIds))
            if (correctAnswersIds.length == correctAnswersIds.length)
                score = existingQuestion.score;
            else
                score = Math.round(existingQuestion.score / 2);
        return score;
    }
    async findCorrectAnswersIds(id) {
        const existingQuestion = await this.questionModel.findById(id);
        if (!existingQuestion)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUESTION_NOT_FOUND);
        const correctAnswersIds = existingQuestion.answersOptions
            .filter((a) => a.isCorrect)
            .map((a) => a.id);
        return correctAnswersIds;
    }
    async getQuestionScore(id) {
        const score = await this.questionModel.findById(id, { score: 1 });
        if (!score)
            return 0;
        return score.score;
    }
    async getTotalQuestionsScore(questionsIds) {
        const scores = await Promise.all(questionsIds.map((questionId) => this.getQuestionScore(questionId)));
        const maxScore = scores.reduce((total, score) => total + score, 0);
        return maxScore;
    }
    removeIsCorrectFromAnswers(question) {
        const answersOptions = question.answersOptions;
        const newAnswersOptions = answersOptions.map((ans) => ({
            id: ans.id,
            text: ans.text,
        }));
        question.answersOptions = newAnswersOptions;
        return question;
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Question.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map