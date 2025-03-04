import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EErrorMessage, IAnswer, IQuestion } from 'src/common';
import { UpdateQuestionDto, CreateQuestionDto, FindManyDto } from './dto';
import { Model } from 'mongoose';
import { Question } from './schemas';
import { isSubArray } from 'src/utils';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<IQuestion>,
  ) {}

  async createOne(createQuestionDto: CreateQuestionDto): Promise<IQuestion> {
    const newQuestion = new this.questionModel({
      ...createQuestionDto,
      creationDate: new Date(),
    });
    return await newQuestion.save();
  }

  async findAll(): Promise<IQuestion[]> {
    const existingQuestions = await this.questionModel.find();
    return existingQuestions;
  }

  async findOne(id: string): Promise<IQuestion> {
    const existingQuestion = await this.questionModel.findById(id);
    if (!existingQuestion)
      throw new NotFoundException(EErrorMessage.QUESTION_NOT_FOUND);

    return existingQuestion;
  }

  async findMany(findManyDto: FindManyDto): Promise<IQuestion[]> {
    const existingQuestion = await this.questionModel.find({
      _id: { $in: findManyDto.questionsIds },
    },
    {
      correctAnswers: 0,
    }
  );
    if (!existingQuestion)
      throw new NotFoundException(EErrorMessage.QUESTIONS_NOT_FOUND);

    return existingQuestion;
  }


  async updateOne(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<IQuestion> {
    const updatedQuestion = await this.questionModel.findByIdAndUpdate(
      id,
      updateQuestionDto,
    );
    if (!updatedQuestion)
      throw new NotFoundException(EErrorMessage.UPDATED_QUESTION_NOT_FOUND);
    return updatedQuestion;
  }

  async deleteOne(id: string): Promise<IQuestion> {
    const deletedQuestion = await this.questionModel.findByIdAndDelete(id);
    if (!deletedQuestion)
      throw new NotFoundException(EErrorMessage.QUESTION_NOT_FOUND);
    return deletedQuestion;
  }

  async checkAnswers(id: string, providedAnswers: string[]): Promise<number> {
    // # 1 verify that it's a valid question from the database
    const existingQuestion = await this.questionModel.findById(id);
    if (!existingQuestion)
      throw new NotFoundException(EErrorMessage.QUESTION_NOT_FOUND);
    // #2 take correct answers from the found questions
    const answersOptions = existingQuestion.answersOptions;
    const correctAnswers = answersOptions
                              .filter((a) => a.isCorrect)
                              .map((a) => a.text);
  
    // #3 default value to 0 for the score
    let score = 0;

    // #4 check if the answers are correct
    //  if provided answers is not a subarray of the correctAnswer thro
    if(isSubArray<string>(correctAnswers, providedAnswers))
        if ( correctAnswers.length == providedAnswers.length )
          score = existingQuestion.score;
        else
          score = Math.round(existingQuestion.score / 2);
    return score;
  }

  async findCorrectAnswers(id: string): Promise<string[]> {
    const existingQuestion = await this.questionModel.findById(id);
    if (!existingQuestion)
      throw new NotFoundException(EErrorMessage.QUESTION_NOT_FOUND);
    const correctAnswers = existingQuestion.answersOptions
      .filter((a) => a.isCorrect)
      .map((a) => a.text);
    return correctAnswers;
  }
}
