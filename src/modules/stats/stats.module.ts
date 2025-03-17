import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { MembersModule } from '../members';
import { QuizzesModule } from '../quizzes';
import { AnswerHistoryModule } from '../answer-history/answer-history.module';
import { QuestionsModule } from '../questions';

@Module({
  imports: [MembersModule, QuizzesModule, AnswerHistoryModule, QuestionsModule],
  providers: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {}
