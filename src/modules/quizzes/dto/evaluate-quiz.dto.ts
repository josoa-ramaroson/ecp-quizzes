import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AnswerRecordDto {
  @IsString()
  @IsMongoId()
  questionId: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  answers: string[];
}

export class EvaluateQuizDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  memberId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerRecordDto)
  @IsNotEmpty()
  answersRecord: AnswerRecordDto[];
}
