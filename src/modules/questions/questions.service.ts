import { Injectable, NotFoundException } from '@nestjs/common';
import { EErrorMessage, IQuestion } from 'src/common';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './schemas/question.schema';

@Injectable()
export class QuestionsService {
    constructor(@InjectModel(Question.name) private readonly questionModel: Model<IQuestion>) {}
    
    async create(createQuestionDto: CreateQuestionDto): Promise<IQuestion> {
        const newQuestion = new this.questionModel(createQuestionDto);
        return await newQuestion.save();
    }
    async findAll() {
        const existingQuestions = await this.questionModel.find();  
        return existingQuestions;
    }

    async findOne(id: string): Promise<IQuestion> {
        const existingQuestion = await this.questionModel.findById(id)
        if (!existingQuestion)
            throw new NotFoundException(EErrorMessage.QUESTIONS_NOT_FOUND)
        
        return existingQuestion;
    }

    async updateOne(id: string, updateQuestionDto: UpdateQuestionDto): Promise<IQuestion> {
        const updatedQuestion = await this.questionModel.findByIdAndUpdate(id, updateQuestionDto);
        if (!updatedQuestion)
            throw new NotFoundException(EErrorMessage.UPDATED_QUESTION_NOT_FOUND)
        return updatedQuestion;
    }

    async deleteOne(id: string): Promise<IQuestion> {
        const deletedQuestion = await this.questionModel.findByIdAndDelete(id);
        if (!deletedQuestion)
            throw new NotFoundException(EErrorMessage.QUESTIONS_NOT_FOUND)
        return deletedQuestion;
    }
}
