import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class AnswerRecordDto {
  @IsString()
  @IsMongoId()
  questionId: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  answers: string[];

  @IsOptional()
  isCorrect: boolean;
}

export class CreateAnswerHistoryDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  memberId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerRecordDto)
  @IsNotEmpty()
  answersRecord: AnswerRecordDto[];

  @IsNumber()
  @IsNotEmpty()
  score: number;
}
