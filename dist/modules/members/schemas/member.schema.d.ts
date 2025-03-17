import { EMemberRole } from 'src/common';
export declare class Member {
    firstName: string;
    pseudo: string;
    facebookName: string;
    role: EMemberRole;
    password: string;
    totalScore: number;
    hasPasswordChanged: boolean;
    isActiveAccount: boolean;
}
export declare const MemberSchema: import("mongoose").Schema<Member, import("mongoose").Model<Member, any, any, any, import("mongoose").Document<unknown, any, Member> & Member & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Member, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Member>> & import("mongoose").FlatRecord<Member> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
