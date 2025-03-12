import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { MembersModule } from '../members';
import { QuizzesModule } from '../quizzes';
import { AnswerHistoryModule } from '../answer-history/answer-history.module';

@Module({
  imports: [MembersModule, QuizzesModule, AnswerHistoryModule],
  providers: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {}
