import { EQuestionType, IAnswer } from 'src/common';
declare class Answer implements IAnswer {
    id: string;
    text: string;
    isCorrect: boolean;
}
export declare class Question {
    title: string;
    description: string;
    type: EQuestionType;
    answersOptions: Answer[];
    comment: string;
    score: number;
    creationDate: Date;
}
export declare const QuestionSchema: import("mongoose").Schema<Question, import("mongoose").Model<Question, any, any, any, import("mongoose").Document<unknown, any, Question> & Question & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Question, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Question>> & import("mongoose").FlatRecord<Question> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
