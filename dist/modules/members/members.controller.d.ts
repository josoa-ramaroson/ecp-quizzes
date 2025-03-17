import { MembersService } from './members.service';
import { CreateMemberDto, UpdateMemberProfileDto } from './dto';
import { UpdateMemberDto } from './dto';
import { AuthenticatedRequest } from 'src/common';
export declare class MembersController {
    private readonly memberService;
    constructor(memberService: MembersService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("src/common").IMember> & import("src/common").IMember & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("src/common").IMember>;
    createOne(createMemberDto: CreateMemberDto): Promise<import("src/common").IMember>;
    updateProfile(updateMemberProfileDto: UpdateMemberProfileDto, req: AuthenticatedRequest): Promise<import("mongoose").Document<unknown, {}, import("src/common").IMember> & import("src/common").IMember & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateOne(id: string, updateMemberDto: UpdateMemberDto): Promise<import("src/common").IMember>;
    deleteOne(id: string): Promise<import("src/common").IMember>;
}
