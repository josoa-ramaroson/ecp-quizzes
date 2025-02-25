import { HttpStatus } from "@nestjs/common";

export enum EQuestionType {
  MULTIPLE_ANSWER = "MULTIPLE_CHOICE",
  SINGLE_ANSWER = "SINGLE_CHOICE",
  SHORT_ANSWER = "SHORT_ANSWER"
}
