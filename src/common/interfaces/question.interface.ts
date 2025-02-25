import { Document, Types } from "mongoose";
import { EQuestionType } from "../enums";

export interface IQuestion extends Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    type: EQuestionType;
    answersOptions: string[];
    correctAnswers: string[];
    comment?: string;
}