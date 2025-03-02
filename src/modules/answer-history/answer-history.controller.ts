import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswerHistoryService } from './answer-history.service';
import { CreateAnswerHistoryDto } from './dto/create-answer-history.dto';
import { UpdateAnswerHistoryDto } from './dto/update-answer-history.dto';

@Controller('answer-history')
export class AnswerHistoryController {
  constructor(private readonly answerHistoryService: AnswerHistoryService) {}

  @Post()
  create(@Body() createAnswerHistoryDto: CreateAnswerHistoryDto) {
    return this.answerHistoryService.create(createAnswerHistoryDto);
  }

  @Get()
  findAll() {
    return this.answerHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerHistoryDto: UpdateAnswerHistoryDto) {
    return this.answerHistoryService.update(+id, updateAnswerHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerHistoryService.remove(+id);
  }
}
