import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EMemberRole } from 'src/common';

@Schema()
export class Member {

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  pseudo: string;

  @Prop({ required: true })
  facebookName: string;

  @Prop({ required: false, default: EMemberRole.MEMBER })
  role: EMemberRole;

  @Prop({ required: true })
  password: string;

  @Prop()
  totalScore: number;

  @Prop({ default: false })
  hasPasswordChanged: boolean
}

export const MemberSchema = SchemaFactory.createForClass(Member);
