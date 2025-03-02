import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question, QuestionSchema } from './schemas';
import { MemberIdValidationPipe, QuestionValidationPipe } from './pipes';
import { Member, MemberSchema, MembersModule } from '../members';
import { ScoringInterceptor } from './interceptors';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Question.name, schema: QuestionSchema },
            { name: Member.name, schema: MemberSchema }
        ]),
        MembersModule
    ],
    controllers: [QuestionsController],
    providers: [
        QuestionsService,
        QuestionValidationPipe,
        MemberIdValidationPipe,
        ScoringInterceptor,
    ],
    exports: [QuestionsService]
})
export class QuestionsModule {}
