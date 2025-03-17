declare class AnswerRecordDto {
    questionId: string;
    answersIds: string[];
}
export declare class CreateAnswerHistoryDto {
    memberId: string;
    quizId: string;
    answersRecord: AnswerRecordDto[];
    score: number;
}
export {};
