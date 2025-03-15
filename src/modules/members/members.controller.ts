import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto, UpdateMemberProfileDto } from './dto';
import {
  HashPasswordInterceptor,
  RemovePasswordInterceptor,
} from './interceptors';
import { UpdateMemberDto } from './dto';
import { AuthenticatedRequest, EErrorMessage } from 'src/common';

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

  @Put("profile")
  @UseInterceptors(HashPasswordInterceptor)
  async updateProfile(
    @Body() updateMemberProfileDto: UpdateMemberProfileDto,
    @Req() req: AuthenticatedRequest
) {
    const memberId = req.user?.sub;
      if (!memberId)
        throw new UnauthorizedException(EErrorMessage.INVALID_TOKEN_ERROR );
    return await this.memberService.updateProfile(memberId, updateMemberProfileDto);
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
