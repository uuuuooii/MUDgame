import { Repository } from 'typeorm';
import { User } from '../../../domain/entity/user.entity';
export declare class UserRepository extends Repository<User> {
    createUser(username: string, hashedPassword: string): Promise<void>;
    findUserByUsername(username: string): Promise<User>;
}
