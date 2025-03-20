import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly title: string;

  @IsString()
  @IsOptional()
  @MaxLength(1500)
  readonly description: string;

  @IsDateString()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  readonly startDate: Date;
  
  @IsDateString()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  readonly deadline: Date;

  @IsBoolean()
  @IsNotEmpty()
  readonly isPublished: boolean;
}
