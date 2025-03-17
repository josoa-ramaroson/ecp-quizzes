import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { EErrorMessage, IAuthPayload } from 'src/common';
import { MembersService } from 'src/modules/members';
import { extractTokenFromHeader } from 'src/utils';

@Injectable()
export class ActiveAccountGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private membersService: MembersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    const payload = await this.verifyToken(token);
    return await this.verifyActiveAccount(payload);
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

  private async verifyActiveAccount(payload: IAuthPayload): Promise<boolean> {
    const existingMember = await this.membersService.findOne(payload.sub);
    return existingMember.isActiveAccount;
  }
  
}
