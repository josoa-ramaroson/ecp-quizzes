import { IAnswerRecord, IQuestion } from 'src/common';
export declare class ResponseQuestionOfQuizDto {
    _id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    questions: IQuestion[];
    maxScore: number;
    totalScore: number | undefined;
    answersRecord: IAnswerRecord[] | undefined;
}
