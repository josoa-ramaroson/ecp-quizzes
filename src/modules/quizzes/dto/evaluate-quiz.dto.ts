import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AnswerRecordDto {
  @IsString()
  @IsMongoId()
  questionId: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  answersIds: string[];
}

export class EvaluateQuizDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerRecordDto)
  @IsNotEmpty()
  answers: AnswerRecordDto[];
}
