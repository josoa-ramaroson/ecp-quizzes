import { Test, TestingModule } from '@nestjs/testing';
import { AnswerHistoryService } from './answer-history.service';

describe('AnswerHistoryService', () => {
  let service: AnswerHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerHistoryService],
    }).compile();

    service = module.get<AnswerHistoryService>(AnswerHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
