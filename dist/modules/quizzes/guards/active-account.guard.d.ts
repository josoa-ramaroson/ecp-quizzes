import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MembersService } from 'src/modules/members';
export declare class ActiveAccountGuard implements CanActivate {
    private jwtService;
    private configService;
    private membersService;
    constructor(jwtService: JwtService, configService: ConfigService, membersService: MembersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private verifyToken;
    private verifyActiveAccount;
}
