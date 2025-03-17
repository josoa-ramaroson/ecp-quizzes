import { EQuestionType } from 'src/common';
import { AnswersOptionsDto } from './answers.dto';
export declare class CreateQuestionDto {
    readonly title: string;
    readonly description: string;
    readonly type: EQuestionType;
    readonly answersOptions: AnswersOptionsDto[];
    readonly comment: string;
    readonly score: number;
}
