import { Module } from '@nestjs/common';
import { QuestionsModule } from '../questions/questions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schema';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { VerifyManyQuestionIdPipe, VerifyOneQuestionIdPipe } from './pipes';
import { MembersModule } from '../members';
import { AnswerHistoryModule } from '../answer-history/answer-history.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    QuestionsModule,
    MembersModule,
    AnswerHistoryModule,
    CommonModule,
  ],
  controllers: [QuizzesController],
  providers: [
    QuizzesService,
    VerifyOneQuestionIdPipe,
    VerifyManyQuestionIdPipe,
  ],
  exports: [QuizzesService],
})
export class QuizzesModule {}
