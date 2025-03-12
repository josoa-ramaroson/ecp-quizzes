import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AddOneQuestionDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  questionId: string;
}
