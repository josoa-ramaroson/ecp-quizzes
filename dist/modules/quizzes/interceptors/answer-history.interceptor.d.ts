import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AnswerHistoryService } from 'src/modules/answer-history/answer-history.service';
export declare class AnswerHistoryInterceptor implements NestInterceptor {
    private readonly answerHistoryService;
    constructor(answerHistoryService: AnswerHistoryService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
