import { PipeTransform } from '@nestjs/common';
import { QuestionsService } from 'src/modules/questions';
import { AddManyQuestionDto } from '../dto';
export declare class VerifyManyQuestionIdPipe implements PipeTransform {
    private readonly questionsSerivice;
    constructor(questionsSerivice: QuestionsService);
    transform(value: AddManyQuestionDto): Promise<AddManyQuestionDto>;
}
