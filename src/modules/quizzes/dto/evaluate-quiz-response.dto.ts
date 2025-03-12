import { AnswerRecordDto } from './evaluate-quiz.dto';

export class EvaluateQuizResponseDto {
  score: number;
  answersRecord: AnswerRecordDto[];
  quizId: string;
}
