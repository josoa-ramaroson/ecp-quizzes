import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';

export class AddManyQuestionDto {
  questionsIds: string[];
}
