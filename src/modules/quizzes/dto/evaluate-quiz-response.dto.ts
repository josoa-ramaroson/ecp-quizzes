import { EvaluateQuizDto } from './evaluate-quiz.dto';

export class EvaluateQuizResponseDto extends EvaluateQuizDto {
  score: number;
}
