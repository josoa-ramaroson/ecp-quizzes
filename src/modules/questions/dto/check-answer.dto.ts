import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CheckAnswerDto {
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  answers: string[];

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  quizId: string;
}
