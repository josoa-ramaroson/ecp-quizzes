import { PipeTransform } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
export declare class QuestionValidationPipe implements PipeTransform {
    transform(value: CreateQuestionDto | UpdateQuestionDto): CreateQuestionDto | UpdateQuestionDto;
}
