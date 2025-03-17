import { PipeTransform } from '@nestjs/common';
import { AddOneQuestionDto } from '../dto';
import { QuestionsService } from 'src/modules/questions';
export declare class VerifyOneQuestionIdPipe implements PipeTransform {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    transform(value: AddOneQuestionDto): Promise<AddOneQuestionDto>;
}
