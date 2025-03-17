import { IAnswer } from 'src/common';
export declare class AnswersOptionsDto implements IAnswer {
    readonly id: string;
    readonly text: string;
    readonly isCorrect: boolean;
}
