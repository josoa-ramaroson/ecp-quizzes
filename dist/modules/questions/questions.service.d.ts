import { IQuestion } from 'src/common';
import { UpdateQuestionDto, CreateQuestionDto } from './dto';
import { Model } from 'mongoose';
export declare class QuestionsService {
    private readonly questionModel;
    constructor(questionModel: Model<IQuestion>);
    createOne(createQuestionDto: CreateQuestionDto): Promise<IQuestion>;
    findAll(): Promise<IQuestion[]>;
    findOne(id: string): Promise<IQuestion>;
    findManyWithAnswer(questionsIds: string[]): Promise<IQuestion[]>;
    findManyWithOutAnswer(questionsIds: string[]): Promise<IQuestion[]>;
    updateOne(id: string, updateQuestionDto: UpdateQuestionDto): Promise<IQuestion>;
    deleteOne(id: string): Promise<IQuestion>;
    checkAnswers(id: string, providedAnswersIds: string[]): Promise<number>;
    findCorrectAnswersIds(id: string): Promise<string[]>;
    getQuestionScore(id: string): Promise<number>;
    getTotalQuestionsScore(questionsIds: string[]): Promise<number>;
    removeIsCorrectFromAnswers(question: IQuestion): IQuestion;
}
