import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { EErrorMessage } from 'src/common';
import { AddOneQuestionDto } from '../dto';
import { verifyObjectId } from 'src/utils';
import { QuestionsService } from 'src/modules/questions';

@Injectable()
export class VerifyOneQuestionIdPipe implements PipeTransform {
  constructor(private readonly questionsService: QuestionsService) {}

  async transform(value: AddOneQuestionDto): Promise<AddOneQuestionDto> {
    // # 1 : verify the existance of questionId
    if (!value?.questionId)
      throw new BadRequestException(EErrorMessage.MISSING_QUESTION_ID_ERROR);
    // # 2 verify the data types
    if (typeof value?.questionId !== 'string')
      throw new BadRequestException(EErrorMessage.INVALID_QUESTION_ID_ERROR);

    // #3 verify if we can convert it into objectId
    const questionId = value.questionId;
    if (!verifyObjectId(questionId))
      throw new BadRequestException(EErrorMessage.INVALID_QUESTION_ID_ERROR);

    // #4 verify if it's not in databases
    const existingQuestion = await this.questionsService.findOne(questionId);
    if (!existingQuestion)
      throw new NotFoundException(EErrorMessage.QUESTION_NOT_FOUND);

    return { questionId };
  }
}
