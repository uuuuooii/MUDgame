import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto.ts';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialDto: AuthCredentialDto): Promise<void>;
    singIn(authCredentialDto: AuthCredentialDto): Promise<{
        accessToken: string;
    }>;
    test(user: User): void;
}
