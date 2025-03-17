import { IAnswerHistory } from 'src/common';
import { Model, Types } from 'mongoose';
import { CreateAnswerHistoryDto } from './dto';
export declare class AnswerHistoryService {
    private readonly answerHistoryModel;
    constructor(answerHistoryModel: Model<IAnswerHistory>);
    create(createAnswerHistoryDto: CreateAnswerHistoryDto): Promise<IAnswerHistory>;
    findAll(): Promise<IAnswerHistory[]>;
    findOne(id: string): Promise<IAnswerHistory>;
    findByMember(memberId: string): Promise<IAnswerHistory[]>;
    findQuizTakenByMember(quizId: string, memberId: string | Types.ObjectId): Promise<IAnswerHistory>;
    findQuizTakenByMemberFromADate(memberId: string, date: Date): Promise<IAnswerHistory[]>;
    getNumberQuizInHistory(quizId: string): Promise<number>;
    countQuizTakenByMember(memberId: string): Promise<number>;
    countHistoryBetweenDate(startDate: Date, deadline: Date): Promise<number>;
    remove(id: string): string;
}
