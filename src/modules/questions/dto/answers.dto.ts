import { IsString, IsNotEmpty, IsBoolean } from "class-validator";
import { IAnswer } from "src/common";

export class AnswersOptions implements IAnswer {
  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isCorrect: boolean;
}