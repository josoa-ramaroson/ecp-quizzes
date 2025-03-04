import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto';
import { HashPasswordInterceptor, RemovePasswordInterceptor } from './interceptors';
import { UpdateMemberDto } from './dto';

@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) {}

  @Get()
  async findAll() {
    return await this.memberService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.memberService.findOne(id);
  }

  @Post()
  @UseInterceptors(HashPasswordInterceptor)
  async createOne(@Body() createMemberDto: CreateMemberDto) {
    return await this.memberService.createOne(createMemberDto);
  }

  @Put(':id')
  @UseInterceptors(HashPasswordInterceptor)
  async updateOne(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return await this.memberService.updateOne(id, updateMemberDto);
  }

  @Delete(':id')
  @UseInterceptors(RemovePasswordInterceptor)
  async deleteOne(@Param('id') id: string) {
    return await this.memberService.deleteOne(id);
  }
}
