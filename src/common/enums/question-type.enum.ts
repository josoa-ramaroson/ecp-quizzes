import { HttpStatus } from "@nestjs/common";

export enum EQuestionType {
  MULTIPLE_ANSWER = "multiple",
  SINGLE_ANSWER = "single",
  SHORT_ANSWER = "short"
}
