import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserRepository extends Repository<User> {
    createUser(username: string, hashedPassword: string): Promise<void>;
    findUserByUsername(username: string): Promise<User>;
}
