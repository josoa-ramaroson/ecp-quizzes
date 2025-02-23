import { EQuestionType } from "src/common";

export class UpdateQuestionDto {
    id: string;
    title: string;
    description: string;
    type: EQuestionType;
    answersOptions: string[];
    correctAnswer: string[];
    comment?: string; 
}