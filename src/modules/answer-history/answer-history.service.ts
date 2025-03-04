import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnswerHistory } from './schemas';
import { EErrorMessage, IAnswerHistory } from 'src/common';
import { Model } from 'mongoose';
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

  remove(id: string) {
    return `This action removes a #${id} answerHistory`;
  }
}
