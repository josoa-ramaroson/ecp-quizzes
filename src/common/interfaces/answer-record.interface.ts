import { IAnswer } from "./answer.interface";

export interface IAnswerRecord {
  questionId: string;
  answers: IAnswer[];
  isCorrect?: boolean;
}
