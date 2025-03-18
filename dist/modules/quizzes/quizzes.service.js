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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("./schema");
const mongoose_2 = require("mongoose");
const common_2 = require("../../common");
const questions_1 = require("../questions");
const answer_history_1 = require("../answer-history");
const utils_1 = require("../../utils");
let QuizzesService = class QuizzesService {
    constructor(questionsService, answerHistoryService, quizModel) {
        this.questionsService = questionsService;
        this.answerHistoryService = answerHistoryService;
        this.quizModel = quizModel;
    }
    async createOne(createQuizDto) {
        const newQuizz = new this.quizModel(createQuizDto);
        return await newQuizz.save();
    }
    async findAll() {
        return await this.quizModel.find();
    }
    async findOne(id) {
        const existingQuizz = await this.quizModel.findById(id);
        if (!existingQuizz)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUIZ_NOT_FOUND);
        return existingQuizz;
    }
    async findAllByDate(date) {
        const existingQuizz = await this.quizModel.find({
            startDate: { $gte: date.setHours(0, 0, 0) },
            deadline: { $lte: date.setHours(23, 59, 59) },
        });
        if (!existingQuizz)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUIZ_NOT_FOUND);
        return existingQuizz;
    }
    async findOneByDate(date, filter) {
        date.setUTCHours(0, 0, 0, 0);
        const deadline = new Date(date);
        deadline.setUTCDate(deadline.getDate() + 1);
        deadline.setUTCHours(0, 0, 0, 0);
        const existingQuizz = await this.quizModel.findOne({
            startDate: { $gte: date },
            deadline: { $lte: deadline },
            isPublished: true,
            ...filter,
        });
        if (!existingQuizz)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUIZ_NOT_FOUND);
        return existingQuizz;
    }
    async findAllBefore(date) {
        const queryDate = new Date(date);
        queryDate.setUTCHours(23, 59, 59, 999);
        const existingQuizz = await this.quizModel.find({
            startDate: { $lte: queryDate },
            isPublished: true,
        });
        if (!existingQuizz)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUIZ_NOT_FOUND);
        return existingQuizz;
    }
    async findAllAfter(date) {
        const queryDate = new Date(date);
        queryDate.setUTCHours(23, 59, 59, 59);
        const existingQuizz = await this.quizModel.find({
            startDate: { $gte: queryDate },
            isPublished: true,
        });
        if (!existingQuizz)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUIZ_NOT_FOUND);
        return existingQuizz;
    }
    async findDaily(memberId) {
        const date = new Date();
        const existingQuizz = await this.findOneByDate(date, { isDaily: true });
        return await this.fillMemberInfoToQuiz(existingQuizz, memberId);
    }
    async findSinceNow() {
        const date = new Date();
        const existingQuizzes = await this.findAllBefore(date);
        return existingQuizzes;
    }
    async findUpComing() {
        const today = new Date();
        return await this.findAllAfter(today);
    }
    async findOfMember(memberId) {
        const quizByNow = await this.findSinceNow();
        const quizzes = await Promise.all(quizByNow.map(async (quiz) => await this.fillMemberInfoToQuiz(quiz, memberId)));
        return quizzes;
    }
    async fillMemberInfoToQuiz(quiz, memberId) {
        const { _id, title, description, startDate, deadline, isPublished, creationDate, questionsIds, } = quiz;
        const maxScore = await this.questionsService.getTotalQuestionsScore(questionsIds);
        const answerHistory = await this.findInHistory(quiz._id.toString(), memberId);
        const isCompleted = !!answerHistory;
        const totalScore = answerHistory?.score;
        return {
            _id,
            title,
            description,
            startDate,
            deadline,
            isPublished,
            creationDate,
            numberOfQuestions: questionsIds.length,
            totalScore,
            maxScore,
            isCompleted,
            status: (0, utils_1.getQuizStatus)(quiz),
        };
    }
    async getQuizzesMaxScore(quizId) {
        try {
            const quizzes = await this.findOne(quizId);
            return await this.questionsService.getTotalQuestionsScore(quizzes.questionsIds);
        }
        catch {
            return 0;
        }
    }
    async updateOne(id, UpdateQuizDto) {
        const updatedQuiz = await this.quizModel.findByIdAndUpdate(id, UpdateQuizDto, {
            new: true,
        });
        if (!updatedQuiz)
            throw new common_1.NotFoundException(common_2.EErrorMessage.UPDATED_QUIZ_NOT_FOUND);
        return updatedQuiz;
    }
    async deleteOne(id) {
        const deletedQuiz = await this.quizModel.findByIdAndDelete(id);
        if (!deletedQuiz)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUIZ_NOT_FOUND);
        return deletedQuiz;
    }
    async evaluate(quizId, evaluateQuizDto, memberId) {
        const existingQuiz = await this.quizModel.findById(quizId);
        if (!existingQuiz)
            throw new common_1.NotFoundException(common_2.EErrorMessage.QUIZ_NOT_FOUND);
        if (await this.findInHistory(existingQuiz._id.toString(), memberId))
            throw new common_1.BadRequestException(common_2.EErrorMessage.QUIZZ_ALREADY_TAKEN);
        const questionsIdsQuiz = existingQuiz.questionsIds;
        const answers = evaluateQuizDto.answers;
        const filteredAnswer = this.cleanAnswers(answers, questionsIdsQuiz);
        const score = await this.computeScore(answers);
        return {
            score,
            answersRecord: filteredAnswer,
            quizId,
        };
    }
    async computeScore(answers) {
        let score = 0;
        for (const answer of answers) {
            const questionScore = await this.questionsService.checkAnswers(answer.questionId, answer.answersIds);
            score += questionScore;
        }
        return score;
    }
    async findQuestionsOfQuiz(quizId, memberId) {
        const existingQuiz = await this.findOne(quizId);
        const answerHistory = await this.findInHistory(quizId, memberId);
        const questionsIds = existingQuiz.questionsIds;
        const questions = answerHistory
            ? await this.questionsService.findManyWithAnswer(questionsIds)
            : await this.questionsService.findManyWithOutAnswer(questionsIds);
        const maxScore = await this.questionsService.getTotalQuestionsScore(questions.map((q) => q._id.toString()));
        const response = {
            _id: quizId,
            title: existingQuiz.title,
            description: existingQuiz.description,
            questions,
            totalScore: answerHistory?.score,
            maxScore,
            isCompleted: !!answerHistory,
            answersRecord: answerHistory?.answersRecord,
        };
        return response;
    }
    async findInHistory(quizId, memberId) {
        try {
            const answersHistory = await this.answerHistoryService.findQuizTakenByMember(quizId, memberId);
            return answersHistory;
        }
        catch {
            return null;
        }
    }
    async removeQuestionIdFromQuizzes(questionId) {
        const quizzesContainingQuestion = await this.findQuizContainingQuestion(questionId);
        await Promise.all(quizzesContainingQuestion.map(async (q) => {
            const questionIds = q.questionsIds;
            q.questionsIds = questionIds.filter((id) => id != questionId);
            await q.save();
        }));
        return { message: 'Question removed' };
    }
    async findQuizContainingQuestion(questionId) {
        const quizzes = await this.quizModel.find({
            questionsIds: { $elemMatch: { $eq: questionId } },
        });
        if (!quizzes)
            return [];
        return quizzes;
    }
    async getActiveQuizzesCount() {
        return await this.quizModel.countDocuments({ isPublished: true });
    }
    cleanAnswers(answers, questionsIdsQuiz) {
        return answers.filter((answer) => questionsIdsQuiz.includes(answer.questionId));
    }
    verifyIfContainsQuestion(quiz, questionId) {
        const questions = quiz.questionsIds;
        return questions.includes(questionId);
    }
    verifyIfContainsQuestions(quiz, questionIds) {
        const questions = quiz.questionsIds;
        const questionsSet = new Set(questions.map((question) => question));
        return questionIds.every((id) => questionsSet.has(id));
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(schema_1.Quiz.name)),
    __metadata("design:paramtypes", [questions_1.QuestionsService,
        answer_history_1.AnswerHistoryService,
        mongoose_2.Model])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map