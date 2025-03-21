import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { EErrorMessage, IAuthPayload, IS_PUBLIC_ROUTE } from 'src/common';
import { extractTokenFromHeader } from 'src/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE,
      [context.getHandler(), context.getClass()],
    );

    if (isPublicRoute) return true;

    const request: Request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    const payload = await this.verifyToken(token);
    request["user"] = payload;
    return true;
  }

  private async verifyToken(token: string | undefined): Promise<IAuthPayload> {
    if (!token) {
      throw new UnauthorizedException(EErrorMessage.UNAUTHORIZED_ERROR);
    }
    try {
      const payload: IAuthPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      return payload;
    } catch {
      throw new UnauthorizedException(EErrorMessage.INVALID_TOKEN_ERROR);
    }
  }

}
