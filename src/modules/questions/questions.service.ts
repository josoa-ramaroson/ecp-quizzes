import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EErrorMessage, IQuestion } from 'src/common';
import { UpdateQuestionDto, CreateQuestionDto, CheckAnswersResponseDto, CheckAnswersDto } from './dto';
import { Model } from 'mongoose';
import { Question } from './schemas';

@Injectable()
export class QuestionsService {
    constructor(@InjectModel(Question.name) private readonly questionModel: Model<IQuestion>) {}
    
    async createOne(createQuestionDto: CreateQuestionDto): Promise<IQuestion> {
        const newQuestion = new this.questionModel({...createQuestionDto, creationDate: new Date()});
        return await newQuestion.save();
    }

    async findAll(): Promise<IQuestion[]> {
        const existingQuestions = await this.questionModel.find();  
        return existingQuestions;
    }

    async findOne(id: string): Promise<IQuestion> {
        const existingQuestion = await this.questionModel.findById(id)
        if (!existingQuestion)
            throw new NotFoundException(EErrorMessage.QUESTION_NOT_FOUND)
        
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
            throw new NotFoundException(EErrorMessage.QUESTION_NOT_FOUND)
        return deletedQuestion;
    }

    async checkAnswers(id: string, checkAnswersDto: CheckAnswersDto): Promise<CheckAnswersResponseDto> {
        // # 1 verify that it's a valid question from the database
        const existingQuestion = await this.questionModel.findById(id);
        if (!existingQuestion)
            throw new NotFoundException(EErrorMessage.QUESTION_NOT_FOUND);
        // #2 take correct answers from the found questions and answers given by requests
        const correctAnswers = existingQuestion.correctAnswers;
        const answers = checkAnswersDto.answers;
        // #3 default value to 0 for the score
        let score = 0;
        // #4 if anwsers match all correct answers we attribute the score
        if (answers.every(a => correctAnswers.includes(a)))
            score = existingQuestion.score;
        // #4 crafting the answer
        const memberId = checkAnswersDto.memberId;
        return {memberId, score};
    }
}
