import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { C_HASHING_SERVICE, IHashingService } from 'src/common';

@Injectable()
export class HashPasswordInterceptor implements NestInterceptor {
  constructor(
    @Inject(C_HASHING_SERVICE) private readonly hashingService: IHashingService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpCtx = context.switchToHttp();

    const request: Request = httpCtx.getRequest();

    if (request.body?.password)
      request.body.password = await this.hashingService.hashPassword(
        request.body.password,
      );

    return next.handle();
  }
}
