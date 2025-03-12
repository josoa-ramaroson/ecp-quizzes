import { Types } from 'mongoose';
import { EQuizSTatus } from 'src/common';

export class ResponseQuizzesOfMember {
  _id: Types.ObjectId;
  title: string;
  description: string;
  maxScore: number;
  isCompleted: boolean;
  startDate: Date;
  deadline: Date;
  isPublished: boolean;
  creationDate: Date;
  numberOfQuestions: number;
  status: EQuizSTatus;
  totalScore?: number;
}
