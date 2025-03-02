import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { EQuestionType } from 'src/common';

@Schema()
export class Question {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: EQuestionType;

  @Prop({ required: true })
  answersOptions: string[];

  @Prop({ required: true })
  correctAnswers: string[];

  @Prop()
  comment: string;

  @Prop({ required: true })
  score: number;

  @Prop()
  creationDate: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
