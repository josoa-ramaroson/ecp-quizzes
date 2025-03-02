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
import { QuizzesService } from './quizzes.service';
import {
  AddManyQuestionDto,
  AddOneQuestionDto,
  CreateQuizDto,
  EvaluateQuizDto,
  UpdateQuizDto,
} from './dto';
import { MemberIdValidationPipe, VerifyOneQuestionIdPipe } from './pipes';
import { VerifyManyQuestionIdPipe } from './pipes';
import { AnswerHistoryInterceptor, ScoringInterceptor } from './interceptors';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  async findAll() {
    return await this.quizzesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.quizzesService.findOne(id);
  }

  @Post()
  async createOne(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizzesService.createOne(createQuizDto);
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return await this.quizzesService.updateOne(id, updateQuizDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return await this.quizzesService.deleteOne(id);
  }

  @Put(':id/question')
  async addOneQuestionToQuiz(
    @Param('id') quizId: string,
    @Body(VerifyOneQuestionIdPipe) addOneQuestionDto: AddOneQuestionDto,
  ) {
    return await this.quizzesService.addOneQuestionToQuiz(
      quizId,
      addOneQuestionDto,
    );
  }

  @Put(':id/questions')
  async addManyQuestionsToQuiz(
    @Param('id') quizId: string,
    @Body(VerifyManyQuestionIdPipe) addManyQuestionsDto: AddManyQuestionDto,
  ) {
    return await this.quizzesService.addManyQuestionsToQuiz(
      quizId,
      addManyQuestionsDto,
    );
  }

  @Post(':id/evaluate')
  @UseInterceptors(ScoringInterceptor, AnswerHistoryInterceptor)
  async evaluate(
    @Param('id') id,
    @Body(MemberIdValidationPipe) evaluateQuizResponseDto: EvaluateQuizDto,
  ) {
    return await this.quizzesService.evaluate(id, evaluateQuizResponseDto);
  }

  @Delete(':id/question/:questionId')
  async removeOneQuestionFromQuiz(
    @Param('id') quizId: string,
    @Param('questionId') questionId: string,
  ) {
    return await this.quizzesService.removeQuestionToQuiz(quizId, questionId);
  }
}
