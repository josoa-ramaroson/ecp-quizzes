import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { MembersService } from 'src/modules/members';
import { EvaluateQuizResponseDto } from '../dto';
import { EErrorMessage } from 'src/common';

@Injectable()
export class ScoringInterceptor implements NestInterceptor {
  constructor(private readonly membersService: MembersService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Get the request from the HTTP context
    const request = context.switchToHttp().getRequest();
    // Access the user from the request, similar to how it's done in the controller
    const memberId = request.user?.sub;

    if (!memberId) {
      throw new UnauthorizedException(EErrorMessage.INVALID_TOKEN_ERROR);
    }

    return next.handle().pipe(
      map(async (data: Promise<EvaluateQuizResponseDto>) => {
        // Use the memberId extracted from the request
        const resolvedData = await data;
        const score = resolvedData.score;
        const memberDocument = await this.membersService.findOne(memberId);
        if (memberDocument) memberDocument.totalScore += score;

        await this.membersService.updateOne(memberId, memberDocument);
        return data;
      }),
    );
  }
}
