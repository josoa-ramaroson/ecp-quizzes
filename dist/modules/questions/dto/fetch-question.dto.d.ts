import { EQuestionType } from 'src/common';
export interface FetchQuestionDto {
    _id: string;
    title: string;
    description: string;
    type: EQuestionType;
    answersOptions: string[];
    score: number;
    comment?: string;
    creationDate: Date;
}
