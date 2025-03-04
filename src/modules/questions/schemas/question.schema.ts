import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { EQuestionType, IAnswer } from 'src/common';

@Schema()
class Answer implements IAnswer {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  isCorrect: boolean;
}

@Schema()
export class Question {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: EQuestionType;

  @Prop({ required: true })
  answersOptions: Answer[];

  @Prop()
  comment: string;

  @Prop({ required: true })
  score: number;

  @Prop()
  creationDate: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
