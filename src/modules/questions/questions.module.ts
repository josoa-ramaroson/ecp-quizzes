import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schema';
import { QuestionValidationPipe } from './pipes/question-validation.pipe';

@Module({
    imports: [MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])],
    controllers: [QuestionsController],
    providers: [
        QuestionsService,
        QuestionValidationPipe
    ]
})
export class QuestionsModule {}
