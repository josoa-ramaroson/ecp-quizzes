import { Types } from 'mongoose';
import { Question } from 'src/modules/questions';
export declare class Quiz {
    title: string;
    description: string;
    startDate: Date;
    deadline: Date;
    questionsIds: Question[];
    creationDate: Date;
    isPublished: boolean;
    isDaily: boolean;
}
export declare const QuizSchema: import("mongoose").Schema<Quiz, import("mongoose").Model<Quiz, any, any, any, import("mongoose").Document<unknown, any, Quiz> & Quiz & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Quiz, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Quiz>> & import("mongoose").FlatRecord<Quiz> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
