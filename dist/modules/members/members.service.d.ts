import { Model } from 'mongoose';
import { EMemberRole, IMember } from 'src/common';
import { CreateMemberDto, UpdateMemberDto, UpdateMemberProfileDto } from './dto';
export declare class MembersService {
    private readonly memberModel;
    constructor(memberModel: Model<IMember>);
    createOne(createMemberDto: CreateMemberDto): Promise<IMember>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, IMember> & IMember & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findAllMember(role: EMemberRole): Promise<(import("mongoose").Document<unknown, {}, IMember> & IMember & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<IMember>;
    findOneByPseudo(pseudo: string): Promise<IMember>;
    getMembersRanking(): Promise<(import("mongoose").Document<unknown, {}, IMember> & IMember & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getRank(memberId: string): Promise<number>;
    getTotalCount(): Promise<number>;
    updateOne(id: string, updateMemberDto: UpdateMemberDto): Promise<IMember>;
    updateProfile(memberId: string, memberData: UpdateMemberProfileDto): Promise<import("mongoose").Document<unknown, {}, IMember> & IMember & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteOne(id: string): Promise<IMember>;
}
