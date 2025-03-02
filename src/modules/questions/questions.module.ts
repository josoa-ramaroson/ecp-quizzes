import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question, QuestionSchema } from './schemas';
import { QuestionValidationPipe } from './pipes';

@Module({
    imports: [MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])],
    controllers: [QuestionsController],
    providers: [
        QuestionsService,
        QuestionValidationPipe
    ],
    exports: [QuestionsService]
})
export class QuestionsModule {}
