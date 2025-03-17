import { AnswerHistoryService } from './answer-history.service';
export declare class AnswerHistoryController {
    private readonly answerHistoryService;
    constructor(answerHistoryService: AnswerHistoryService);
    findAll(): Promise<import("../../common").IAnswerHistory[]>;
    findOne(id: string): Promise<import("../../common").IAnswerHistory>;
    remove(id: string): string;
}
