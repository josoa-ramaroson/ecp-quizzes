import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { QuestionValidationPipe } from './pipes';
import { QuestionsService } from './questions.service';
import { RemoveCorrectAnswerInterceptor } from './interceptors';

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Post()
  @UsePipes(QuestionValidationPipe)
  async createOne(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createOne(createQuestionDto);
  }

  @Get()
  async findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  @UseInterceptors(RemoveCorrectAnswerInterceptor)
  async findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body(QuestionValidationPipe) updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.updateOne(id, updateQuestionDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.questionService.deleteOne(id);
  }
}
