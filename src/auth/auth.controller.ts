import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { PublicRoutes } from 'src/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('member/sign-in')
  @PublicRoutes()
  async memberSignIn(@Body() signInDto: SignInDto) {
    return await this.authService.memberSignIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('moderator/sign-in')
  @PublicRoutes()
  async moderatorSignIn(@Body() signInDto: SignInDto) {
    return await this.authService.moderatorSignIn(signInDto);
  }
}
