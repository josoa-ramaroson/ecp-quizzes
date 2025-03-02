import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Question } from 'src/modules/questions';

@Schema()
export class Quiz {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: Question.name }] })
  questions: Question[];

  @Prop({ default: new Date() })
  creationDate: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
