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
  startDate: Date;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: Question.name }] })
  questionsIds: Question[];

  @Prop({ default: new Date() })
  creationDate: Date;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: false })
  isDaily: boolean;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
