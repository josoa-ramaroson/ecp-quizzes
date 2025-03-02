import { Module } from '@nestjs/common';
import { AnswerHistoryService } from './answer-history.service';
import { AnswerHistoryController } from './answer-history.controller';

@Module({
  controllers: [AnswerHistoryController],
  providers: [AnswerHistoryService],
})
export class AnswerHistoryModule {}
