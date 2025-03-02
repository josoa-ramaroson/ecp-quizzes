import { Document, Types } from 'mongoose';
import { IAnswerRecord } from './answer-record.interface';

export interface IAnswerHistory extends Document {
  _id: Types.ObjectId;
  quizId: Types.ObjectId;
  memberId: Types.ObjectId;
  answersRecord: IAnswerRecord[];
  date: Date;
  score: number;
}
