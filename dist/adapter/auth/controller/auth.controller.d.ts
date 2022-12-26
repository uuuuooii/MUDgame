import { AuthService } from '../../../domain/auth/auth.service';
import { AuthCredentialDto } from '../../../domain/auth/dto/auth-credential.dto.ts';
import { User } from '../../../domain/entity/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialDto: AuthCredentialDto): Promise<void>;
    singIn(authCredentialDto: AuthCredentialDto): Promise<{
        accessToken: string;
    }>;
    test(user: User): void;
}
