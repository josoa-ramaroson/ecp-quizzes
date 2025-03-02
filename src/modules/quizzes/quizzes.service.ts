import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz } from './schema';
import { Model } from 'mongoose';
import { EErrorMessage, IQuiz } from 'src/common';
import {
  AddManyQuestionDto,
  AddOneQuestionDto,
  CreateQuizDto,
  EvaluateQuizDto,
  EvaluateQuizResponseDto,
  UpdateQuizDto,
} from './dto';
import { QuestionsService } from '../questions';

@Injectable()
export class QuizzesService {
  constructor(
    private readonly questionsService: QuestionsService,
    @InjectModel(Quiz.name) private readonly quizModel: Model<IQuiz>,
  ) {}

  async createOne(createQuizDto: CreateQuizDto): Promise<IQuiz> {
    const newQuizz = new this.quizModel(createQuizDto);
    return await newQuizz.save();
  }

  async findAll(): Promise<IQuiz[]> {
    return await this.quizModel.find();
  }

  async findOne(id: string): Promise<IQuiz> {
    const existingQuizz = await this.quizModel.findById(id);

    if (!existingQuizz)
      throw new NotFoundException(EErrorMessage.QUIZ_NOT_FOUND);
    return existingQuizz;
  }

  async updateOne(id: string, UpdateQuizDto: UpdateQuizDto): Promise<IQuiz> {
    const updatedQuiz = await this.quizModel.findByIdAndUpdate(
      id,
      UpdateQuizDto,
    );
    if (!updatedQuiz)
      throw new NotFoundException(EErrorMessage.UPDATED_QUIZ_NOT_FOUND);
    return updatedQuiz;
  }

  async deleteOne(id: string): Promise<IQuiz> {
    const deletedQuiz = await this.quizModel.findByIdAndDelete(id);
    if (!deletedQuiz) throw new NotFoundException(EErrorMessage.QUIZ_NOT_FOUND);
    return deletedQuiz;
  }

  async addOneQuestionToQuiz(
    quizId: string,
    quesiton: AddOneQuestionDto,
  ): Promise<IQuiz> {
    const existingQuiz = await this.quizModel.findById(quizId);
    if (!existingQuiz)
      throw new NotFoundException(EErrorMessage.QUIZ_NOT_FOUND);

    if (this.verifyIfContainsQuestion(existingQuiz, quesiton.questionId))
      throw new ConflictException(EErrorMessage.QUESTION_ALREADY_IN_THE_QUIZ);

    existingQuiz.questions.push(quesiton.questionId);
    return await existingQuiz.save();
  }

  async addManyQuestionsToQuiz(
    quizId: string,
    addManyQuestionsDto: AddManyQuestionDto,
  ): Promise<IQuiz> {
    7;
    const existingQuiz = await this.quizModel.findById(quizId);
    if (!existingQuiz)
      throw new NotFoundException(EErrorMessage.QUIZ_NOT_FOUND);

    const { questionIds } = addManyQuestionsDto;
    const quizQuestions = existingQuiz.questions;

    if (this.verifyIfContainsQuestions(existingQuiz, questionIds))
      throw new ConflictException(EErrorMessage.QUESTIONS_ALREADY_IN_THE_QUIZ);

    existingQuiz.questions.push(...questionIds);
    return await existingQuiz.save();
  }

  async removeQuestionToQuiz(quizId: string, questionId: string) {
    const existingQuiz = await this.quizModel.findById(quizId);
    if (!existingQuiz)
      throw new NotFoundException(EErrorMessage.QUIZ_NOT_FOUND);

    if (!this.verifyIfContainsQuestion(existingQuiz, questionId))
      throw new NotFoundException(EErrorMessage.QUESTIONS_NOT_FOUND);

    existingQuiz.questions = existingQuiz.questions.filter(
      (question) => question !== questionId,
    );
    return await existingQuiz.save();
  }

  async evaluate(
    id: string,
    evaluateQuizDto: EvaluateQuizDto,
  ): Promise<EvaluateQuizResponseDto> {
    const existingQuiz = await this.quizModel.findById(id);
    if (!existingQuiz)
      throw new NotFoundException(EErrorMessage.QUIZ_NOT_FOUND);

    const answers = evaluateQuizDto.answersRecord;
    let score = 0;
    for (const answer of answers) {
      const questionScore = await this.questionsService.checkAnswers(
        answer.questionId,
        answer.answers,
      );
      score += questionScore;
      answer.isCorrect = questionScore > 0;
    }

    return {
      ...evaluateQuizDto,
      score,
    };
  }

  verifyIfContainsQuestion(quiz: IQuiz, questionId: string): boolean {
    const questions = quiz.questions;
    return questions.includes(questionId);
  }

  verifyIfContainsQuestions(quiz: IQuiz, questionIds: string[]): boolean {
    const questions = quiz.questions;
    const questionsSet = new Set(questions.map((question) => question));
    return questionIds.every((id) => questionsSet.has(id));
  }
}
