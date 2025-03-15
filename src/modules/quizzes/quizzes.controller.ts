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
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto, EvaluateQuizDto, UpdateQuizDto } from './dto';
import { AnswerRecordValidationPipe, ParseDatePipe } from './pipes';
import { AnswerHistoryInterceptor, ScoringInterceptor } from './interceptors';
import { AuthenticatedRequest, EErrorMessage } from 'src/common';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  async findAll() {
    return await this.quizzesService.findAll();
  }

  @Get('daily')
  async findDaily(@Req() req: AuthenticatedRequest) {
    const memberId = req.user?.sub;
    if (!memberId)
      throw new UnauthorizedException(EErrorMessage.INVALID_TOKEN_ERROR);
    return await this.quizzesService.findDaily(memberId);
  }

  @Get('by-date/:date')
  async findByDate(@Param('date', ParseDatePipe) date: Date) {
    return await this.quizzesService.findAllByDate(date);
  }

  @Get('before/:date')
  async findBefore(@Param('date', ParseDatePipe) date: Date) {
    return await this.quizzesService.findAllBefore(date);
  }

  @Get('of-member')
  async findByNow(@Req() req: AuthenticatedRequest) {
    const memberId = req.user?.sub;
    if (!memberId)
      throw new UnauthorizedException(EErrorMessage.INVALID_TOKEN_ERROR);
    return await this.quizzesService.findOfMember(memberId);
  }

  @Get('upcoming')
  async findUpComing() {
    return await this.quizzesService.findUpComing();
  }

  @Get(':id/questions')
  async findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const memberId = req.user?.sub;
    if (!memberId)
      throw new UnauthorizedException(EErrorMessage.INVALID_TOKEN_ERROR);
    return await this.quizzesService.findQuestionsOfQuiz(id, memberId);
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

  @Post(':id/evaluate')
  @UseInterceptors(ScoringInterceptor, AnswerHistoryInterceptor)
  async evaluate(
    @Param('id') id,
    @Body(AnswerRecordValidationPipe)
    evaluateQuizResponseDto: EvaluateQuizDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const memberId = req.user?.sub;
    if (!memberId)
      throw new UnauthorizedException(EErrorMessage.INVALID_TOKEN_ERROR);
    return await this.quizzesService.evaluate(
      id,
      evaluateQuizResponseDto,
      memberId,
    );
  }
}
