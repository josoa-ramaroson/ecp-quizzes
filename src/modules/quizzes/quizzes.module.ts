import { Module } from '@nestjs/common';
import { QuestionsModule } from '../questions/questions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schema';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import {
  MemberIdValidationPipe,
  VerifyManyQuestionIdPipe,
  VerifyOneQuestionIdPipe,
} from './pipes';
import { MembersModule } from '../members';
import { AnswerHistoryModule } from '../answer-history/answer-history.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    QuestionsModule,
    MembersModule,
    AnswerHistoryModule,
  ],
  controllers: [QuizzesController],
  providers: [
    QuizzesService,
    VerifyOneQuestionIdPipe,
    VerifyManyQuestionIdPipe,
    MemberIdValidationPipe,
  ],
  exports: [QuizzesService],
})
export class QuizzesModule {}
