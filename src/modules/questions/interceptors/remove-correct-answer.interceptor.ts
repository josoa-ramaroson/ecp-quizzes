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
          if (Array.isArray(data)) {
            return data.map((question) => {
              const answersOptions = question.answersOptions;
              return {
                ...question,
                answersOptions: answersOptions.map((ans) => ans.text),
              };
            });
          } else {
            const answersOptions = data.answersOptions;
            return {
              ...data,
              answersOptions: answersOptions.map((ans) => ans.text),
            };
          }
        }
      }),
    );
  }
}
