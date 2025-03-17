import { AuthService } from './auth.service';
import { SignInDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    memberSignIn(signInDto: SignInDto): Promise<any>;
    moderatorSignIn(signInDto: SignInDto): Promise<any>;
}
