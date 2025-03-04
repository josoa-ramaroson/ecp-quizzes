import { AnswerRecordDto, EvaluateQuizDto } from './evaluate-quiz.dto';

export class EvaluateQuizResponseDto extends EvaluateQuizDto {
  score: number;
  answersRecord: ResponseAnswerRecordDto[];
}

export class ResponseAnswerRecordDto extends AnswerRecordDto {
  correctAnswers: string[];
}

