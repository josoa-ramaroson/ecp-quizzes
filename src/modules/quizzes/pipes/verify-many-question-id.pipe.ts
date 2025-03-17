import {
  BadRequestException,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { EErrorMessage } from 'src/common';
import { QuestionsService } from 'src/modules/questions';
import { AddManyQuestionDto } from '../dto';
import { verifyObjectId } from 'src/utils';

@Injectable()
export class VerifyManyQuestionIdPipe implements PipeTransform {
  constructor(private readonly questionsSerivice: QuestionsService) {}

  async transform(value: AddManyQuestionDto): Promise<AddManyQuestionDto> {
    // #1 verify the du body exists
    if (!value?.questionsIds)
      throw new BadRequestException(EErrorMessage.MISSING_QUESTION_IDS_ERROR);

    // #2 verify the data types
    const questionsIds = value?.questionsIds;
    if (!Array.isArray(questionsIds))
      throw new BadRequestException(EErrorMessage.QUESTION_IDS_IN_BAD_FORMAT);

    // #3 verify if we can convert all of the questionIds is string and convertible into objectId
    if (questionsIds.some((id) => typeof id !== 'string' && verifyObjectId(id)))
      throw new BadRequestException(EErrorMessage.INVALID_QUESTION_IDS_ERROR);

    // #4 verify that every questionId exists in database
    // Fetch all requested questions in a single query
    const existingQuestions =
      await this.questionsSerivice.findManyWithOutAnswer(questionsIds);
    if (existingQuestions.length !== questionsIds.length) {
      // Identify missing question IDs
      const existingIds = new Set(existingQuestions.map((q) => q.id));
      const missingIds = questionsIds.filter((id) => !existingIds.has(id));

      throw new NotFoundException(
        `${EErrorMessage.QUESTION_NOT_FOUND}: ${missingIds.join(', ')}`,
      );
    }

    // #5 Map the results efficiently without extra queries
    return { questionsIds };
  }
}
