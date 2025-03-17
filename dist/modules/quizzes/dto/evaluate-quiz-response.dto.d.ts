import { AnswerRecordDto } from './evaluate-quiz.dto';
export declare class EvaluateQuizResponseDto {
    score: number;
    answersRecord: AnswerRecordDto[];
    quizId: string;
}
