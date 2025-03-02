import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnswerHistory } from './schemas';
import { IAnswerHistory } from 'src/common';
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

  async findOne(id: number) {
    return `This action returns a #${id} answerHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} answerHistory`;
  }
}
