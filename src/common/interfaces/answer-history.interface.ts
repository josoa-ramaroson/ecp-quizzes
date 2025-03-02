import { Document, Types } from "mongoose";

interface IAnswerRecord {
    question: string;
    answers: string[];
    isCorrect: boolean;
}
export interface IAnswerHistory extends Document {
    _id: Types.ObjectId;
    quizId: Types.ObjectId;
    memberId: Types.ObjectId;
    answersRecord: IAnswerRecord[];
    date: Date;
    score: number;
}