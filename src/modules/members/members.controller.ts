import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { HashPasswordInterceptor } from './interceptors/hash-password.interceptor';
import { RemovePasswordInterceptor } from './interceptors/remove-password.interceptor';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MembersController {
    constructor(private readonly memberService: MembersService) {}

    @Get()
    @UseInterceptors(RemovePasswordInterceptor)
    async findAll() {
        return await this.memberService.findAll();
    }

    @Get(":id")
    @UseInterceptors(RemovePasswordInterceptor)
    async findOne(@Param("id") id: string) {
        return await this.memberService.findOne(id);
    }
    
    @Post()
    @UseInterceptors(HashPasswordInterceptor, RemovePasswordInterceptor)
    async createOne(@Body() createMemberDto: CreateMemberDto) {
        return await this.memberService.createOne(createMemberDto);
    }

    @Put(":id")
    @UseInterceptors(HashPasswordInterceptor, RemovePasswordInterceptor)
    async updateOne(@Param("id") id: string, @Body() updateMemberDto: UpdateMemberDto) {
        return await this.memberService.updateOne(id, updateMemberDto);
    }

    @Delete(":id")
    @UseInterceptors(RemovePasswordInterceptor)
    async deleteOne(@Param("id") id: string) {
        return await this.memberService.deleteOne(id);
    }
}
