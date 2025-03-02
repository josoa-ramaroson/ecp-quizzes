import { Document, Types } from 'mongoose';

export interface IQuiz extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  deadline: Date;
  questions: string[];
  creationDate: Date;
}
