import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IQuestion } from 'src/common';

@Injectable()
export class RemoveCorrectAnswerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: IQuestion | IQuestion[]) => {
        if (data) {
          console.log(typeof data);
          if (Array.isArray(data)) {
            return data.map((question) => {
              question.correctAnswers = [];
              return question;
            });
          } else {
            data.correctAnswers = [];
            return data;
          }
        }
      }),
    );
  }
}
