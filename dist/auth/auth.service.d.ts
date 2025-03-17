import { IHashingService } from 'src/common';
import { MembersService } from 'src/modules/members/members.service';
import { SignInDto } from './dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly memberService;
    private hashingService;
    private readonly jwtService;
    constructor(memberService: MembersService, hashingService: IHashingService, jwtService: JwtService);
    memberSignIn(signInDto: SignInDto): Promise<any>;
    moderatorSignIn(signInDto: SignInDto): Promise<any>;
}
