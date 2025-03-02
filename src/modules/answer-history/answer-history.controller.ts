import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnswerHistoryService } from './answer-history.service';
import {  } from './dto';
import { CreateAnswerHistoryDto } from './dto';

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerHistoryService.remove(+id);
  }
}
