import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CheckAnswerResponseDto {
  quizId: string;
  answers: string[];
}
