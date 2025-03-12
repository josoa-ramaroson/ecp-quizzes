import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { EErrorMessage } from 'src/common';

@Injectable()
export class QuestionValidationPipe implements PipeTransform {
  transform(
    value: CreateQuestionDto | UpdateQuestionDto,
    metadata: ArgumentMetadata,
  ) {
    const answersOptions = value.answersOptions;
    if (
      answersOptions == undefined ||
      !Array.isArray(answersOptions) ||
      answersOptions.length === 0
    )
      throw new BadRequestException(EErrorMessage.INVALID_ANSWER_OPTIONS);

    const isCorrectAnswers = answersOptions?.filter((a) => a.isCorrect);
    if (isCorrectAnswers?.length === 0)
      throw new BadRequestException(EErrorMessage.NO_CORRECT_ANSWER);

    return value;
  }
}
