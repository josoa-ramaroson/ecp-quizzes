import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from './schemas/member.schema';
import { EErrorMessage,  IMember } from 'src/common';
import { Model } from 'mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
    constructor(@InjectModel(Member.name) private readonly memberModel: Model<IMember>) {}
        
        async createOne(createMemberDto: CreateMemberDto ): Promise<IMember> {
            
            const existingMember = await this.memberModel.findOne({email: createMemberDto.email});
            
            if (existingMember)
                throw new ConflictException(EErrorMessage.MEMBER_ALREADY_EXISTS);
            
            const newMember = new this.memberModel(createMemberDto);
            return await newMember.save();
        }
        async findAll() {
            
            const existingMember = await this.memberModel.find();  
            return existingMember;
        }
    
        async findOne(id: string): Promise<IMember> {
            const existingMember = await this.memberModel.findById(id)
            if (!existingMember)
                throw new NotFoundException(EErrorMessage.MEMBER_NOT_FOUND)
            
            return existingMember;
        }
    
        async updateOne(id: string, updateMemberDto: UpdateMemberDto): Promise<IMember> {
            const updatedMember = await this.memberModel.findByIdAndUpdate(id, updateMemberDto);
            if (!updatedMember)
                throw new NotFoundException(EErrorMessage.UPDATED_MEMBER_NOT_FOUND)
            return updatedMember;
        }
    
        async deleteOne(id: string): Promise<IMember> {
            const deletedMember = await this.memberModel.findByIdAndDelete(id);
            if (!deletedMember)
                throw new NotFoundException(EErrorMessage.MEMBER_NOT_FOUND)
            return deletedMember;
        }
}
