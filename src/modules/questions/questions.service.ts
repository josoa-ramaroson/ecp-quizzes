import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EErrorMessage, IQuestion } from 'src/common';
import { UpdateQuestionDto, CreateQuestionDto } from './dto';
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

  async findManyWithAnswer(questionsIds: string[]): Promise<IQuestion[]> {
    const existingQuestion = await this.questionModel.find({
      _id: { $in: questionsIds },
    });

    if (!existingQuestion)
      throw new NotFoundException(EErrorMessage.QUESTIONS_NOT_FOUND);

    return existingQuestion;
  }

  async findManyWithOutAnswer(questionsIds: string[]): Promise<IQuestion[]> {
    const existingQuestion = await this.questionModel.find({
      _id: { $in: questionsIds },
    });

    if (!existingQuestion)
      throw new NotFoundException(EErrorMessage.QUESTIONS_NOT_FOUND);

    const answerFilteredQuestions = existingQuestion.map((question) =>
      this.removeIsCorrectFromAnswers(question),
    );

    return answerFilteredQuestions;
  }

  async updateOne(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<IQuestion> {
    const updatedQuestion = await this.questionModel.findByIdAndUpdate(
      id,
      updateQuestionDto,
      {
        new: true,
      },
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

  async checkAnswers(
    id: string,
    providedAnswersIds: string[],
  ): Promise<number> {
    // # 1 verify that it's a valid question from the database
    const existingQuestion = await this.questionModel.findById(id);
    if (!existingQuestion)
      throw new NotFoundException(EErrorMessage.QUESTION_NOT_FOUND);
    // #2 take correct answers from the found questions
    // Take their Ids
    const answersOptions = existingQuestion.answersOptions;
    const correctAnswersIds = answersOptions
      .filter((a) => a.isCorrect)
      .map((a) => a.id);

    // #3 default value to 0 for the score
    let score = 0;

    // #4 check if the answers are correct

    if (isSubArray<string>(correctAnswersIds, providedAnswersIds))
      if (providedAnswersIds.length == correctAnswersIds.length)
        score = existingQuestion.score;
      else score = Math.round(existingQuestion.score / 2);
    return score;
  }

  async findCorrectAnswersIds(id: string): Promise<string[]> {
    const existingQuestion = await this.questionModel.findById(id);
    if (!existingQuestion)
      throw new NotFoundException(EErrorMessage.QUESTION_NOT_FOUND);
    const correctAnswersIds = existingQuestion.answersOptions
      .filter((a) => a.isCorrect)
      .map((a) => a.id);
    return correctAnswersIds;
  }

  async getQuestionScore(id: string): Promise<number> {
    const score = await this.questionModel.findById(id, { score: 1 });
    if (!score) return 0;
    return score.score;
  }

  async getTotalQuestionsScore(questionsIds: string[]) {
    const scores = await Promise.all(
      questionsIds.map((questionId) => this.getQuestionScore(questionId)),
    );
    const maxScore = scores.reduce((total, score) => total + score, 0);
    return maxScore;
  }

  removeIsCorrectFromAnswers(question: IQuestion) {
    const answersOptions = question.answersOptions;
    const newAnswersOptions = answersOptions.map((ans) => ({
      id: ans.id,
      text: ans.text,
    }));
    question.answersOptions = newAnswersOptions;
    return question;
  }
}
