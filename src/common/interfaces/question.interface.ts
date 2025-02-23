import { EQuestionType } from "../enums";

export interface IQuestion {
    id: string;
    title: string;
    description: string;
    type: EQuestionType;
    answersOptions: string[];
    correctAnswer: string[];
    comment?: string;
}