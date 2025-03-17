import { Types } from 'mongoose';
export declare class AnswersRecord {
    questionId: Types.ObjectId;
    answersIds: string[];
}
export declare class AnswerHistory {
    quizId: Types.ObjectId;
    memberId: Types.ObjectId;
    answersRecord: AnswersRecord[];
    finishedAt: Date;
    score: number;
}
export declare const AnswerHistorySchema: import("mongoose").Schema<AnswerHistory, import("mongoose").Model<AnswerHistory, any, any, any, import("mongoose").Document<unknown, any, AnswerHistory> & AnswerHistory & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AnswerHistory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AnswerHistory>> & import("mongoose").FlatRecord<AnswerHistory> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
