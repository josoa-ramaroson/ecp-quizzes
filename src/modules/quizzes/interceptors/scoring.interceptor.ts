import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { MembersService } from 'src/modules/members';
import { EvaluateQuizResponseDto } from '../dto';

@Injectable()
export class ScoringInterceptor implements NestInterceptor {
  constructor(private readonly membersService: MembersService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(async (data: EvaluateQuizResponseDto) => {
        const memberId = data.memberId;
        // Score from the answer validation process
        const score = data.score;
        const memberDocument = await this.membersService.findOne(memberId);
        if (memberDocument) memberDocument.totalScore += score;
        await this.membersService.updateOne(memberId, memberDocument);
        return data;
      }),
    );
  }
}
