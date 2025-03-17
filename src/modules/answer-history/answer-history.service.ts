import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnswerHistory } from './schemas';
import { EErrorMessage, IAnswerHistory } from 'src/common';
import { Model, Types } from 'mongoose';
import { CreateAnswerHistoryDto } from './dto';

@Injectable()
export class AnswerHistoryService {
  constructor(
    @InjectModel(AnswerHistory.name)
    private readonly answerHistoryModel: Model<IAnswerHistory>,
  ) {}

  async create(
    createAnswerHistoryDto: CreateAnswerHistoryDto,
  ): Promise<IAnswerHistory> {
    const newAnswerHistory = new this.answerHistoryModel(
      createAnswerHistoryDto,
    );
    return await newAnswerHistory.save();
  }

  async findAll(): Promise<IAnswerHistory[]> {
    return await this.answerHistoryModel.find();
  }

  async findOne(id: string): Promise<IAnswerHistory> {
    const existingHistory = await this.answerHistoryModel.findById(id);

    if (!existingHistory)
      throw new NotFoundException(EErrorMessage.ANSWER_HISTORY_NOT_FOUND);

    return existingHistory;
  }

  async findByMember(memberId: string): Promise<IAnswerHistory[]> {
    const foundAnswerHistory = this.answerHistoryModel.find({
      memberId,
    });
    return foundAnswerHistory;
  }

  async findQuizTakenByMember(
    quizId: string,
    memberId: string | Types.ObjectId,
  ): Promise<IAnswerHistory> {
    const foundAnswerHistory = await this.answerHistoryModel.findOne({
      memberId,
      quizId,
    });

    if (!foundAnswerHistory)
      throw new NotFoundException(EErrorMessage.ANSWER_HISTORY_NOT_FOUND);

    return foundAnswerHistory;
  }

  async findQuizTakenByMemberFromADate(
    memberId: string,
    date: Date,
  ): Promise<IAnswerHistory[]> {
    const foundAnswerHistories = await this.answerHistoryModel.find({
      memberId,
      finishedAt: { $gte: date },
    });

    if (!foundAnswerHistories) return [];

    return foundAnswerHistories;
  }

  async getNumberQuizInHistory(quizId: string) {
    return this.answerHistoryModel.countDocuments({ quizId });
  }

  async countQuizTakenByMember(memberId: string) {
    return this.answerHistoryModel.countDocuments({ memberId });
  }

  async countHistoryBetweenDate(startDate: Date, deadline: Date) {
    startDate.setUTCHours(0, 0, 0, 0);
    deadline.setUTCHours(23, 59, 59, 59);

    return this.answerHistoryModel.countDocuments({
      finishedAt: {
        $gte: startDate,
        $lte: deadline,
      },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} answerHistory`;
  }
}
