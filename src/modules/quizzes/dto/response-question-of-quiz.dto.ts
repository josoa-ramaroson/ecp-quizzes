import { EQuizSTatus, IAnswerRecord, IQuestion } from 'src/common';

export class ResponseQuestionOfQuizDto {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  status: EQuizSTatus;
  questions: IQuestion[];
  maxScore: number;
  totalScore: number | undefined;
  answersRecord: IAnswerRecord[] | undefined;
}
