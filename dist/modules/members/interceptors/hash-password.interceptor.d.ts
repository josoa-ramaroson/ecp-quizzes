import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IHashingService } from 'src/common';
export declare class HashPasswordInterceptor implements NestInterceptor {
    private readonly hashingService;
    constructor(hashingService: IHashingService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
