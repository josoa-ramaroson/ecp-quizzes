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
  answersIds: string[];
}

export class CreateAnswerHistoryDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  memberId: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  quizId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerRecordDto)
  @IsNotEmpty()
  answersRecord: AnswerRecordDto[];

  @IsNumber()
  @IsNotEmpty()
  score: number;
}
