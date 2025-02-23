import { EQuestionType } from "src/common";

export class CreateQuestionDto {
    title: string;
    description: string;
    type: EQuestionType;
    answersOptions: string[];
    correctAnswer: string[];
    comment?: string; 
}