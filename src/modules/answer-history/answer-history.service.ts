import { Injectable } from '@nestjs/common';
import { CreateAnswerHistoryDto } from './dto/create-answer-history.dto';
import { UpdateAnswerHistoryDto } from './dto/update-answer-history.dto';

@Injectable()
export class AnswerHistoryService {
  create(createAnswerHistoryDto: CreateAnswerHistoryDto) {
    return 'This action adds a new answerHistory';
  }

  findAll() {
    return `This action returns all answerHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answerHistory`;
  }

  update(id: number, updateAnswerHistoryDto: UpdateAnswerHistoryDto) {
    return `This action updates a #${id} answerHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} answerHistory`;
  }
}
