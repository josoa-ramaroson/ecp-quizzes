import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AnswerHistoryService } from 'src/modules/answer-history/answer-history.service';
import { EvaluateQuizResponseDto } from '../dto';
import { EErrorMessage, IAnswerHistory } from 'src/common';

@Injectable()
export class AnswerHistoryInterceptor implements NestInterceptor {
  constructor(private readonly answerHistoryService: AnswerHistoryService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();

    return next.handle().pipe(
      map(async (data: EvaluateQuizResponseDto) => {
        try {
          const answerHistory = await this.answerHistoryService.create(data);
        } catch (error) {
          throw new InternalServerErrorException(
            EErrorMessage.INTERNAL_SERVER_ERROR,
          );
        }
        return data;
      }),
    );
  }
}
