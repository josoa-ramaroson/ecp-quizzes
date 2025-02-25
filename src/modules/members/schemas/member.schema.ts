import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { EMemberRole } from "src/common";

@Schema()
export class Member {
    @Prop({required: true})
    email: string;

    @Prop({required: true})
    firstName: string;
    
    @Prop({required:true})
    facebookName: string;

    @Prop({required: false, default: EMemberRole.APPRENTICE})
    role: EMemberRole;

    @Prop({required: true})
    password: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);