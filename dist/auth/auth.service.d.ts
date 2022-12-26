import { AuthCredentialDto } from './dto/auth-credential.dto.ts';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(authCredentialDto: AuthCredentialDto): Promise<void>;
    singIn(authCredentialDto: AuthCredentialDto): Promise<{
        accessToken: string;
    }>;
}
