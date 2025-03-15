import { Document, Types } from 'mongoose';

export interface IQuiz extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  startDate: Date;
  deadline: Date;
  questionsIds: string[];
  creationDate: Date;
  isPublished: boolean;
  isDaily: boolean;
}
