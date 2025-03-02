import { Module } from '@nestjs/common';
import { AnswerHistoryService } from './answer-history.service';
import { AnswerHistoryController } from './answer-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerHistory, AnswerHistorySchema } from './schemas';
import { Question, QuestionSchema, QuestionsModule } from '../questions';
import { Member, MemberSchema, MembersModule } from '../members';
import { Quiz, QuizSchema, QuizzesModule } from '../quizzes';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: AnswerHistory.name, schema: AnswerHistorySchema},
      { name: Question.name, schema: QuestionSchema},
      { name: Member.name, schema: MemberSchema},
      { name: Quiz.name, schema: QuizSchema},
    ]),
    QuestionsModule,
    QuizzesModule,
    MembersModule,
  ],
  controllers: [AnswerHistoryController],
  providers: [AnswerHistoryService],
})
export class AnswerHistoryModule {}
