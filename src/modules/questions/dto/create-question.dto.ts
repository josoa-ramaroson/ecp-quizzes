import {
  IsArray,
  IsEnum,
  isInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { EQuestionType } from 'src/common';

export class CreateQuestionDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(1000)
  readonly description: string;

  @IsEnum(EQuestionType)
  readonly type: EQuestionType;

  @IsArray()
  readonly answersOptions: string[];

  @IsArray()
  @IsNotEmpty()
  readonly correctAnswers: string[];

  @IsString()
  @MaxLength(1000)
  readonly comment: string;

  @IsNumber()
  readonly score: number;
}
