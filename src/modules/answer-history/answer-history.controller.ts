import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AnswerHistoryService } from './answer-history.service';

import { MemberIdValidationPipe } from './pipes';

@Controller('answer-history')
export class AnswerHistoryController {
  constructor(private readonly answerHistoryService: AnswerHistoryService) {}

  @Get()
  findAll() {
    return this.answerHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerHistoryService.findOne(id);
  }

  @Get('by-member')
  findByMember(@Query('memberId', MemberIdValidationPipe) memberId: string) {
    return this.answerHistoryService.findByMember(memberId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerHistoryService.remove(id);
  }
}
