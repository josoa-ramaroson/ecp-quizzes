import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerHistoryService } from './answer-history.service';
import { AnswerHistoryController } from './answer-history.controller';
import {
  AnswerHistory,
  AnswerHistorySchema,
} from './schemas/answer-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnswerHistory.name, schema: AnswerHistorySchema },
    ]),
  ],
  controllers: [AnswerHistoryController],
  providers: [AnswerHistoryService],
  exports: [AnswerHistoryService],
})
export class AnswerHistoryModule {}
