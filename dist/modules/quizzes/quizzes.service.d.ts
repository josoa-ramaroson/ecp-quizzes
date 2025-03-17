import { Model, Types } from 'mongoose';
import { IQuiz } from 'src/common';
import { AnswerRecordDto, CreateQuizDto, EvaluateQuizDto, EvaluateQuizResponseDto, ResponseQuestionOfQuizDto, ResponseQuizzesOfMember, UpdateQuizDto } from './dto';
import { QuestionsService } from '../questions';
import { AnswerHistoryService } from '../answer-history';
export declare class QuizzesService {
    private readonly questionsService;
    private readonly answerHistoryService;
    private readonly quizModel;
    constructor(questionsService: QuestionsService, answerHistoryService: AnswerHistoryService, quizModel: Model<IQuiz>);
    createOne(createQuizDto: CreateQuizDto): Promise<IQuiz>;
    findAll(): Promise<IQuiz[]>;
    findOne(id: string | Types.ObjectId): Promise<IQuiz>;
    findAllByDate(date: Date): Promise<IQuiz[]>;
    findOneByDate(date: Date, filter?: Record<string, string | boolean | number>): Promise<IQuiz>;
    findAllBefore(date: Date): Promise<IQuiz[]>;
    findAllAfter(date: Date): Promise<IQuiz[]>;
    findDaily(memberId: string): Promise<ResponseQuizzesOfMember>;
    findSinceNow(): Promise<IQuiz[]>;
    findUpComing(): Promise<IQuiz[]>;
    findOfMember(memberId: string): Promise<ResponseQuizzesOfMember[]>;
    fillMemberInfoToQuiz(quiz: IQuiz, memberId: string): Promise<ResponseQuizzesOfMember>;
    getQuizzesMaxScore(quizId: string | Types.ObjectId): Promise<number>;
    updateOne(id: string, UpdateQuizDto: UpdateQuizDto): Promise<IQuiz>;
    deleteOne(id: string): Promise<IQuiz>;
    evaluate(quizId: string, evaluateQuizDto: EvaluateQuizDto, memberId: string): Promise<EvaluateQuizResponseDto>;
    computeScore(answers: AnswerRecordDto[]): Promise<number>;
    findQuestionsOfQuiz(quizId: string, memberId: string): Promise<ResponseQuestionOfQuizDto>;
    findInHistory(quizId: string, memberId: string | Types.ObjectId): Promise<import("src/common").IAnswerHistory | null>;
    removeQuestionIdFromQuizzes(questionId: string): Promise<{
        message: string;
    }>;
    findQuizContainingQuestion(questionId: string): Promise<IQuiz[]>;
    getActiveQuizzesCount(): Promise<number>;
    cleanAnswers(answers: AnswerRecordDto[], questionsIdsQuiz: string[]): AnswerRecordDto[];
    verifyIfContainsQuestion(quiz: IQuiz, questionId: string): boolean;
    verifyIfContainsQuestions(quiz: IQuiz, questionIds: string[]): boolean;
}
