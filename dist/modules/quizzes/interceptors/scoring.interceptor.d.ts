import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MembersService } from 'src/modules/members';
export declare class ScoringInterceptor implements NestInterceptor {
    private readonly membersService;
    constructor(membersService: MembersService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
