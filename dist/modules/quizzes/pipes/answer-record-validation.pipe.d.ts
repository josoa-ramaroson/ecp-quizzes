import { PipeTransform } from '@nestjs/common';
import { QuestionsService } from 'src/modules/questions';
import { EvaluateQuizDto } from '../dto';
export declare class AnswerRecordValidationPipe implements PipeTransform {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    transform(value: EvaluateQuizDto): Promise<EvaluateQuizDto>;
    verifyQuestionsId(questionsIds: string[]): Promise<void>;
}
