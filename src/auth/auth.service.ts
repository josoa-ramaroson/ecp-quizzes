import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { C_HASHING_SERVICE, EErrorMessage, IHashingService } from 'src/common';
import { MembersService } from 'src/modules/members/members.service';
import { SignInDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberService: MembersService,
    @Inject(C_HASHING_SERVICE) private hashingService: IHashingService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const { email, password } = signInDto;
    const member = await this.memberService.findOneByEmail(email);
    const hashedPassword = member.password;

    const isAuthenticated = await this.hashingService.verifyPassword(
      password,
      hashedPassword,
    );

    if (!isAuthenticated) throw new UnauthorizedException();

    const payload = { email: member.email, sub: member.id, role: member.role };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
