import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  C_HASHING_SERVICE,
  EErrorMessage,
  EMemberRole,
  IAuthPayload,
  IHashingService,
} from 'src/common';
import { MembersService } from 'src/modules/members/members.service';
import { SignInDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberService: MembersService,
    @Inject(C_HASHING_SERVICE) private hashingService: IHashingService,
    private readonly jwtService: JwtService,
  ) {}

  async memberSignIn(signInDto: SignInDto): Promise<any> {
    const { pseudo, password } = signInDto;
    const member = await this.memberService.findOneByPseudo(pseudo);
    const hashedPassword = member.password;

    const isAuthenticated = await this.hashingService.verifyPassword(
      password,
      hashedPassword,
    );

    if (!isAuthenticated) throw new UnauthorizedException();

    const payload: IAuthPayload = {
      pseudo: member.pseudo,
      sub: member._id.toString(),
      role: member.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async moderatorSignIn(signInDto: SignInDto): Promise<any> {
    const { pseudo, password } = signInDto;
    const moderator = await this.memberService.findOneByPseudo(pseudo);
    const hashedPassword = moderator.password;

    const isAuthenticated = await this.hashingService.verifyPassword(
      password,
      hashedPassword,
    );

    if (!isAuthenticated && moderator.role != EMemberRole.MODERATOR)
      throw new UnauthorizedException(EErrorMessage.UNAUTHORIZED_ERROR);

    const payload = {
      pseudo: moderator.pseudo,
      sub: moderator._id.toString(),
      role: moderator.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
