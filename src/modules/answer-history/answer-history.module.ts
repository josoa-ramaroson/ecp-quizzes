import { Module } from '@nestjs/common';
import { AnswerHistoryService } from './answer-history.service';
import { AnswerHistoryController } from './answer-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerHistory, AnswerHistorySchema } from './schemas';
import { MembersModule } from '../members';
import { QuestionsModule } from '../questions';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnswerHistory.name, schema: AnswerHistorySchema },
    ]),
    QuestionsModule,
    MembersModule,
    CommonModule,
  ],
  controllers: [AnswerHistoryController],
  providers: [AnswerHistoryService],
  exports: [AnswerHistoryService],
})
export class AnswerHistoryModule {}
