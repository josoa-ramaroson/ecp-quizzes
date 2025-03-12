import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { IAnswer } from 'src/common';

export class AnswersOptionsDto implements IAnswer {
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isCorrect: boolean;
}
