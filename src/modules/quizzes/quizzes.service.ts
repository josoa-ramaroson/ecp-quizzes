import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz } from './schema';
import { Model, Types } from 'mongoose';
import { EErrorMessage, IQuestion, IQuiz } from 'src/common';
import {
  AnswerRecordDto,
  CreateQuizDto,
  EvaluateQuizDto,
  EvaluateQuizResponseDto,
  ResponseQuestionOfQuizDto,
  ResponseQuizzesOfMember,
  UpdateQuizDto,
} from './dto';
import { QuestionsService } from '../questions';
import { AnswerHistoryService } from '../answer-history';
import { getQuizStatus } from 'src/utils';

@Injectable()
export class QuizzesService {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly answerHistoryService: AnswerHistoryService,
    @InjectModel(Quiz.name) private readonly quizModel: Model<IQuiz>,
  ) {}

  async createOne(createQuizDto: CreateQuizDto): Promise<IQuiz> {
    const newQuizz = new this.quizModel(createQuizDto);
    return await newQuizz.save();
  }

  async findAll(): Promise<IQuiz[]> {
    return await this.quizModel.find();
  }

  async findOne(id: string | Types.ObjectId): Promise<IQuiz> {
    const existingQuizz = await this.quizModel.findById(id);

    if (!existingQuizz)
      throw new NotFoundException(EErrorMessage.QUIZ_NOT_FOUND);
    return existingQuizz;
  }

  async findAllByDate(date: Date): Promise<IQuiz[]> {
    const existingQuizz = await this.quizModel.find({
      startDate: { $gte: date.setHours(0, 0, 0) },
      deadline: { $lte: date.setHours(23, 59, 59) },
    });

    if (!existingQuizz)
      throw new NotFoundException(EErrorMessage.QUIZ_NOT_FOUND);
    return existingQuizz;
  }

  async findOneByDate(date: Date, filter?:Record<string,string | boolean | number>): Promise<IQuiz> {
    date.setUTCHours(0, 0, 0, 0);
    const deadline = new Date(date);
    deadline.setUTCDate(deadline.getDate() + 1);
    deadline.setUTCHours(0, 0, 0, 0);
    const existingQuizz = await this.quizModel.findOne({
      startDate: { $gte: date },
      deadline: { $lte: deadline },
      isPublished: true,
      ...filter
    });

    if (!existingQuizz)
      throw new NotFoundException(EErrorMessage.QUIZ_NOT_FOUND);
    return existingQuizz;
  }

  async findAllBefore(date: Date): Promise<IQuiz[]> {
    const queryDate = new Date(date);
    queryDate.setUTCHours(23, 59, 59, 999);
    const existingQuizz = await this.quizModel.find({
      startDate: { $lte: queryDate },
      isPublished: true,
    });

    if (!existingQuizz)
      throw new NotFoundException(EErrorMessage.QUIZ_NOT_FOUND);
    return existingQuizz;
  }

  async findAllAfter(date: Date): Promise<IQuiz[]> {
    const queryDate = new Date(date);
    queryDate.setUTCHours(23,59,59,59);
    const existingQuizz = await this.quizModel.find({
      startDate: { $gte: queryDate },
      isPublished: true,
    });

    if (!existingQuizz)
      throw new NotFoundException(EErrorMessage.QUIZ_NOT_FOUND);
    return existingQuizz;
  }

  async findDaily(memberId: string): Promise<ResponseQuizzesOfMember> {
    const date = new Date();
    const existingQuizz = await this.findOneByDate(date, { isDaily: true });

    return await this.fillMemberInfoToQuiz(existingQuizz, memberId);
  }

  async findSinceNow(): Promise<IQuiz[]> {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    const existingQuizzes = await this.findAllBefore(date);
    return existingQuizzes;
  }

  async findUpComing(): Promise<IQuiz[]> {
    const today = new Date();
    return await this.findAllAfter(today);
  }

  async findOfMember(memberId: string): Promise<ResponseQuizzesOfMember[]> {
    const quizByNow = await this.findSinceNow();
    const quizzes = await Promise.all(
      quizByNow.map(
        async (quiz) => await this.fillMemberInfoToQuiz(quiz, memberId),
      ),
    );

    return quizzes;
  }

  async fillMemberInfoToQuiz(
    quiz: IQuiz,
    memberId: string,
  ): Promise<ResponseQuizzesOfMember> {
    const {
      _id,
      title,
      description,
      startDate,
      deadline,
      isPublished,
      creationDate,
      questionsIds,
    } = quiz;
    const maxScore = await this.questionsService.getTotalQuestionsScore(questionsIds);

    const answerHistory = await this.findInHistory(
      quiz._id.toString(),
      memberId,
    );
    const isCompleted = !!answerHistory;
    const totalScore = answerHistory?.score;

    return {
      _id,
      title,
      description,
      startDate,
      deadline,
      isPublished,
      creationDate,
      numberOfQuestions: questionsIds.length,
      totalScore,
      maxScore,
      isCompleted,
      status: getQuizStatus(quiz),
    };
  }

  async getQuizzesMaxScore(quizId: string | Types.ObjectId): Promise<number> {
    try {
      const quizzes = await this.findOne(quizId)
      return await this.questionsService.getTotalQuestionsScore(quizzes.questionsIds);
    } catch (error) {
      return 0;
    }
  }

  async updateOne(id: string, UpdateQuizDto: UpdateQuizDto): Promise<IQuiz> {
    const updatedQuiz = await this.quizModel.findByIdAndUpdate(
      id,
      UpdateQuizDto,
      {
        new: true,
      },
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

  async evaluate(
    quizId: string,
    evaluateQuizDto: EvaluateQuizDto,
    memberId: string,
  ): Promise<EvaluateQuizResponseDto> {
    const existingQuiz = await this.quizModel.findById(quizId);
    if (!existingQuiz)
      throw new NotFoundException(EErrorMessage.QUIZ_NOT_FOUND);

    if (await this.findInHistory(existingQuiz._id.toString(), memberId))
      throw new BadRequestException(EErrorMessage.QUIZZ_ALREADY_TAKEN);

    const questionsIdsQuiz = existingQuiz.questionsIds;
    const answers = evaluateQuizDto.answers;
    const filteredAnswer = this.cleanAnswers(answers, questionsIdsQuiz);
    const score = await this.computeScore(answers);

    return {
      score,
      answersRecord: filteredAnswer,
      quizId,
    };
  }

  async computeScore(answers: AnswerRecordDto[]) {
    let score = 0;

    for (const answer of answers) {
      const questionScore = await this.questionsService.checkAnswers(
        answer.questionId,
        answer.answersIds,
      );
      score += questionScore;
    }

    return score;
  }

  async findQuestionsOfQuiz(
    quizId: string,
    memberId: string,
  ): Promise<ResponseQuestionOfQuizDto> {
    const existingQuiz = await this.findOne(quizId);

    const answerHistory = await this.findInHistory(quizId, memberId);
    const questionsIds = existingQuiz.questionsIds;
    let questions;
    questions = answerHistory
      ? await this.questionsService.findManyWithAnswer(questionsIds)
      : await this.questionsService.findManyWithOutAnswer(questionsIds);
    
      const maxScore = await this.questionsService.getTotalQuestionsScore(
      questions.map((q: IQuestion) => q._id.toString()),
    );

    const response: ResponseQuestionOfQuizDto = {
      _id: quizId,
      title: existingQuiz.title,
      description: existingQuiz.description,
      questions,
      totalScore: answerHistory?.score,
      maxScore,
      isCompleted: !!answerHistory,
      answersRecord: answerHistory?.answersRecord,
    };
    return response;
  }

  async findInHistory(quizId: string, memberId: string | Types.ObjectId) {
    try {
      const answersHistory =
        await this.answerHistoryService.findQuizTakenByMember(quizId, memberId);

      return answersHistory;
    } catch (error) {
      return null;
    }
  }

  async getActiveQuizzesCount() {
    return await this.quizModel.countDocuments({ isPublished: true });
  }

  cleanAnswers(answers: AnswerRecordDto[], questionsIdsQuiz: string[]) {
    return answers.filter((answer) =>
      questionsIdsQuiz.includes(answer.questionId),
    );
  }

  verifyIfContainsQuestion(quiz: IQuiz, questionId: string): boolean {
    const questions = quiz.questionsIds;
    return questions.includes(questionId);
  }

  verifyIfContainsQuestions(quiz: IQuiz, questionIds: string[]): boolean {
    const questions = quiz.questionsIds;
    const questionsSet = new Set(questions.map((question) => question));
    return questionIds.every((id) => questionsSet.has(id));
  }
}
