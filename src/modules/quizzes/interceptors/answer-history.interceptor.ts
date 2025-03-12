import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  UnauthorizedException,
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
    const request = context.switchToHttp().getRequest();
    const memberId = request.user?.sub;

    if (!memberId) {
      throw new UnauthorizedException(EErrorMessage.INVALID_TOKEN_ERROR);
    }

    return next.handle().pipe(
      map(async (data: EvaluateQuizResponseDto) => {
        try {
          await this.answerHistoryService.create({ ...data, memberId });
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException(
            EErrorMessage.INTERNAL_SERVER_ERROR,
          );
        }
        return data;
      }),
    );
  }
}
