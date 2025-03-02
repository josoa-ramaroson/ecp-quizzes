import { Module } from '@nestjs/common';
import { MembersModule } from '../members/members.module';
import { QuestionsModule } from '../questions/questions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schema';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { VerifyOneQuestionIdPipe } from './pipes/verify-one-question-id.pipe';
import { VerifyManyQuestionIdPipe } from './pipes/verify-many-question-id.pipe';
import { Question, QuestionSchema } from '../questions';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Quiz.name, schema: QuizSchema },
            { name: Question.name, schema: QuestionSchema},
        ]),
        QuestionsModule, 
        MembersModule
    ],
    controllers: [QuizzesController],
    providers: [
        QuizzesService,
        VerifyOneQuestionIdPipe,
        VerifyManyQuestionIdPipe,
    ],
})
export class QuizzesModule {}
