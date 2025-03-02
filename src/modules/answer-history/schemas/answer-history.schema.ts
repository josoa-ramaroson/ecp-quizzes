import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Member } from "src/modules/members";
import { Question } from "src/modules/questions";
import { Quiz } from "src/modules/quizzes";


@Schema({_id: false})
class AnswersRecord {
    @Prop({type: Types.ObjectId, ref: Question.name, required: true })
    questionId: Types.ObjectId;

    @Prop({type: [String], required: true}) 
    answers: string[];

    @Prop({type: Boolean, required: true})
    isCorrect: boolean;
}

@Schema()
export class AnswerHistory {
    @Prop({type: { type: Types.ObjectId, ref: Quiz.name, required: true }})
    quizId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: Member.name, required: true })
    memberId: Types.ObjectId;

    @Prop({type: [AnswersRecord], required: true })
    answersRecord: AnswersRecord;

    @Prop({ required: true })
    date: Date;

    @Prop({type: Number, required: true, default: 0})
    score: number;
}

export const AnswerHistorySchema = SchemaFactory.createForClass(AnswerHistory);
