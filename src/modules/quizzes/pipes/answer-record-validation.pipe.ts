import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { QuestionsService } from 'src/modules/questions';
import { EvaluateQuizDto } from '../dto';
import { EErrorMessage } from 'src/common';

@Injectable()
export class AnswerRecordValidationPipe implements PipeTransform {
  constructor(private readonly questionsService: QuestionsService) {}

  async transform(value: EvaluateQuizDto, metadata: ArgumentMetadata) {
    const answersRecord = value.answers;
    const questionIds = answersRecord.map((answer) => answer.questionId);
    await this.verifyQuestionsId(questionIds);

    return value;
  }

  async verifyQuestionsId(questionsIds: string[]) {
    const questions =
      await this.questionsService.findManyWithOutAnswer(questionsIds);
    const foundQuestionIds = new Set(questions.map((q) => q._id.toString()));

    // Find missing question IDs
    const missingQuestions = questionsIds.filter(
      (id) => !foundQuestionIds.has(id),
    );

    if (missingQuestions.length > 0) {
      throw new BadRequestException({
        message: EErrorMessage.QUESTION_NOT_FOUND,
        missingQuestions,
      });
    }
  }
}
