import { Controller, Get, Param, Delete } from '@nestjs/common';
import { AnswerHistoryService } from './answer-history.service';

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerHistoryService.remove(id);
  }
}
