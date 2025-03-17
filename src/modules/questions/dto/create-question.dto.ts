import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { EQuestionType } from 'src/common';
import { AnswersOptionsDto } from './answers.dto';

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
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswersOptionsDto)
  readonly answersOptions: AnswersOptionsDto[];

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  readonly comment: string;

  @IsNumber()
  readonly score: number;
}
