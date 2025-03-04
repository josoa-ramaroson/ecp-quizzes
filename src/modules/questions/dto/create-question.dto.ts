import { Type } from 'class-transformer';
import {
  ArrayContains,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInstance,
  isInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { EQuestionType } from 'src/common';
import { AnswersOptions } from './answers.dto';



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

  @IsArray({each: true})
  @IsNotEmpty({each: true})
  @ArrayNotEmpty()
  @ValidateNested({each: true})
  @Type(() => AnswersOptions)
  readonly answersOptions: AnswersOptions[];

  @IsString()
  @MaxLength(1000)
  readonly comment: string;

  @IsNumber()
  readonly score: number;
}
