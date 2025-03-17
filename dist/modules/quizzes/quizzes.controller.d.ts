import { QuizzesService } from './quizzes.service';
import { CreateQuizDto, EvaluateQuizDto, UpdateQuizDto } from './dto';
import { AuthenticatedRequest } from 'src/common';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    findAll(): Promise<import("src/common").IQuiz[]>;
    findDaily(req: AuthenticatedRequest): Promise<import("./dto").ResponseQuizzesOfMember>;
    findByDate(date: Date): Promise<import("src/common").IQuiz[]>;
    findBefore(date: Date): Promise<import("src/common").IQuiz[]>;
    findByNow(req: AuthenticatedRequest): Promise<import("./dto").ResponseQuizzesOfMember[]>;
    findUpComing(): Promise<import("src/common").IQuiz[]>;
    findOne(id: string, req: AuthenticatedRequest): Promise<import("./dto").ResponseQuestionOfQuizDto>;
    createOne(createQuizDto: CreateQuizDto): Promise<import("src/common").IQuiz>;
    evaluate(id: any, evaluateQuizResponseDto: EvaluateQuizDto, req: AuthenticatedRequest): Promise<import("./dto").EvaluateQuizResponseDto>;
    updateOne(id: string, updateQuizDto: UpdateQuizDto): Promise<import("src/common").IQuiz>;
    deleteQuestionsFromQuiz(questionId: string): Promise<{
        message: string;
    }>;
    deleteOne(id: string): Promise<import("src/common").IQuiz>;
}
