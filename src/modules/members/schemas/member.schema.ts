import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { EMemberRole } from "src/common/enums";


export class Member {
    @Prop({required: true})
    email: string;

    @Prop({required: true})
    firstName: string;
    
    @Prop({required:true})
    facebookName: string;

    @Prop({default: EMemberRole.APPRENTICE})
    role: EMemberRole;
}

export const MemberSchema = SchemaFactory.createForClass(Member);