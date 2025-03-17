import { Document, Types } from 'mongoose';
import { EQuestionType } from '../enums';
import { IAnswer } from './answer.interface';
export interface IQuestion extends Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    type: EQuestionType;
    answersOptions: IAnswer[];
    score: number;
    comment?: string;
    creationDate: Date;
}
